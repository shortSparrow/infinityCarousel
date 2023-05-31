import { Animated, ViewStyle } from 'react-native'
import { getSlideInterpolator } from '../utils/slides/getSlideInterpolator'
import { getSlideAnimatedStyle } from '../utils/slides/getSlideAnimatedStyle'

export enum SLIDER_ANIMATION_TYPE {
  ONE,
  TWO,
  THREE,
  FOUR,
  NO_EFFECTS,
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

  const interpolate = getSlideInterpolator(scrollEvent, slideWidthWithOffset)

  for (let i = 0; i < slidesCount; i += 1) {
    animatedImageStyles[i] = {
      style: {
        ...(customSlideAnimation
          ? customSlideAnimation(hiddenIndexScrolling, i, interpolate)
          : getSlideAnimatedStyle(hiddenIndexScrolling, i, interpolate, slideAnimationType)),
      },
      image: list[i],
    }
  }

  return {
    animatedImageStyles,
  }
}
