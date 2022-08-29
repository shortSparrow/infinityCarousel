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
  scrollEvent: React.MutableRefObject<Animated.Value>
) => {
  const slidesCount = list.length
  const imageStyles = Array(slidesCount)

  const interpolate = getImageInterpolator(scrollEvent.current, slideWidth)

  for (let i = 0; i < slidesCount; i += 1) {
    imageStyles[i] = {
      style: {
        opacity: interpolate(i, 0.6, 1),
        transform: [
          {
            translateY: interpolate(i, 0, -25),
          },
          //   {
          //     rotateZ: interpolate(i, '-50deg', '0deg'),
          //   },
          //   {
          //     rotateX: interpolate(i, '50deg', '0deg'),
          //   },
        ],
      },
      image: list[i],
    }
  }

  return {
    imageStyles,
  }
}
