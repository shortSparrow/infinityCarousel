import { Animated } from 'react-native'

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
    })
  }

export const useScrollImageInterpolatedStyles = (
  list: {
    id: string
    image: any
  }[],
  slideWidth: number,
  scrollEvent: React.MutableRefObject<Animated.Value>,
  translate: undefined | number
) => {
  const slidesCount = list.length
  const imageStyles = Array(slidesCount)

  const interpolate = getImageInterpolator(scrollEvent.current, slideWidth)

  for (let i = 0; i < slidesCount; i += 1) {
    imageStyles[i] = {
      style: {
        // // varian 1
        opacity: translate && translate === i ? 1 : interpolate(i, 0.6, 1),
        transform: [
          {
            translateY: translate && translate === i ? -25 : interpolate(i, 0, -25),
          },
        ],
        // // varian 2
        // transform: [
        //   {
        //     scale: translate && translate === i ? 1 : interpolate(i, 0.6, 1),
        //   },
        // ],
        // // varian 3
        // opacity: translate && translate === i ? 1 : interpolate(i, 0.6, 1),
        // transform: [
        //   {
        //     rotateZ: translate && translate === i ? '0deg' : interpolate(i, '-50deg', '0deg'),
        //   },
        // ],
        // zIndex: translate && translate === i ? 1 : interpolate(i, 0, 1),
      },
      image: list[i],
    }
  }

  return {
    imageStyles,
  }
}
