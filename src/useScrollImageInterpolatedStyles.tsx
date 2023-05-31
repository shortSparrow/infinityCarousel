import { Animated, ViewStyle } from 'react-native'

export const getImageInterpolator =
  (animatedValue: Animated.Value, slideWidth: number) =>
  (slideItemIndex: number, minValue: number, maxValue: number): Animated.AnimatedInterpolation => {
    return animatedValue.interpolate({
      inputRange: [
        (slideItemIndex - 1) * slideWidth,
        slideItemIndex * slideWidth,
        (slideItemIndex + 1) * slideWidth,
      ],
      outputRange: [minValue, maxValue, minValue],
      extrapolate: 'clamp',
      // easing: Easing.exp
    })
  }

export enum SLIDER_ANIMATION_TYPE {
  ONE,
  TWO,
  THREE,
  FOUR,
  NO_EFFECTS,
}

const getAnimatedStyle = (
  hiddenIndexScrolling: undefined | number,
  i: number,
  interpolate: (
    slideItemIndex: number,
    minValue: number,
    maxValue: number
  ) => Animated.AnimatedInterpolation,
  type: SLIDER_ANIMATION_TYPE
) => {
  switch (type) {
    case SLIDER_ANIMATION_TYPE.ONE:
      return {
        opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 0.99 : interpolate(i, 0.2, 1),
        transform: [
          {
            translateY:
              hiddenIndexScrolling && hiddenIndexScrolling === i ? -24.99 : interpolate(i, 0, -25),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.TWO:
      return {
        transform: [
          {
            scale: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.THREE:
      return {
        opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
        transform: [
          {
            rotateZ:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '-50deg', '0deg'),
          },
        ],
        zIndex: interpolate(i, 0, 1),
      }
    case SLIDER_ANIMATION_TYPE.FOUR:
      return {
        transform: [
          {
            skewY:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '-45deg', '0deg'),
          },
          {
            rotate:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '45deg', '0deg'),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.NO_EFFECTS:
      return {}
    // default return NO_EFFECTS type
    default:
      return {}
  }
}

type UseScrollImageInterpolatedStyles = {
  list: {
    id: string
    image: any
  }[]
  slideWidthWithOffset: number
  scrollEvent: Animated.Value
  hiddenIndexScrolling: undefined | number
  slideAnimationType?: SLIDER_ANIMATION_TYPE
  customSlideAnimation?: (
    hiddenIndexScrolling: undefined | number,
    i: number,
    interpolate: (
      slideItemIndex: number,
      minValue: number,
      maxValue: number
    ) => Animated.AnimatedInterpolation
  ) => ViewStyle
}

export const useScrollImageInterpolatedStyles = ({
  list,
  slideWidthWithOffset,
  scrollEvent,
  hiddenIndexScrolling,
  slideAnimationType = SLIDER_ANIMATION_TYPE.ONE,
  customSlideAnimation,
}: UseScrollImageInterpolatedStyles) => {
  const slidesCount = list.length
  const animatedImageStyles = Array(slidesCount)

  const interpolate = getImageInterpolator(scrollEvent, slideWidthWithOffset)

  for (let i = 0; i < slidesCount; i += 1) {
    animatedImageStyles[i] = {
      style: {
        ...(customSlideAnimation
          ? customSlideAnimation(hiddenIndexScrolling, i, interpolate)
          : getAnimatedStyle(hiddenIndexScrolling, i, interpolate, slideAnimationType)),
      },
      image: list[i],
    }
  }

  return {
    animatedImageStyles,
  }
}
