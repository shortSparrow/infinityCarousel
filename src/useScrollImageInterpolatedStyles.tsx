import { Animated, Easing } from 'react-native'

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

export const useScrollImageInterpolatedStyles = (
  list: {
    id: string
    image: any
  }[],
  slideWidth: number,
  scrollEvent: Animated.Value,
  hiddenIndexScrolling: undefined | number
) => {
  const slidesCount = list.length
  const imageStyles = Array(slidesCount)

  const interpolate = getImageInterpolator(scrollEvent, slideWidth)

  for (let i = 0; i < slidesCount; i += 1) {
    imageStyles[i] = {
      style: {
        // // version 1
        opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
        transform: [
          {
            translateY:
              hiddenIndexScrolling && hiddenIndexScrolling === i ? -25 : interpolate(i, 0, -25),
          },
        ],
        // // version 2
        // transform: [
        //   {
        //     scale: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
        //   },
        // ],
        // // version 3
        // opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
        // transform: [
        //   {
        //     rotateZ:
        //       hiddenIndexScrolling && hiddenIndexScrolling === i
        //         ? '0deg'
        //         : interpolate(i, '-50deg', '0deg'),
        //   },
        // ],
        // zIndex: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0, 1),
        // // version 4 (ios)
        // transform: [
        //   {
        //     skewY:
        //       hiddenIndexScrolling && hiddenIndexScrolling === i
        //         ? '0deg'
        //         : interpolate(i, '-45deg', '0deg'),
        //   },
        // ],
        // // varian 4 (android)
        // transform: [
        //   {
        //     skewY:
        //       hiddenIndexScrolling && hiddenIndexScrolling === i
        //         ? '0deg'
        //         : interpolate(i, '-45deg', '0deg'),
        //   },
        //   {
        //     rotate:
        //       hiddenIndexScrolling && hiddenIndexScrolling === i
        //         ? '0deg'
        //         : interpolate(i, '45deg', '0deg'),
        //   },
        // ],
      },
      image: list[i],
    }
  }

  return {
    imageStyles,
  }
}
