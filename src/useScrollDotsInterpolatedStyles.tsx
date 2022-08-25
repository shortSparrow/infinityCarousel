import { Animated } from 'react-native'

export const getInterpolator =
  (animatedValue: Animated.Value, deltaWidth: number) =>
  (slideItemIndex: number, outputRange: [number, number, number]): Animated.AnimatedInterpolation =>
    animatedValue.interpolate({
      inputRange: [
        (slideItemIndex - 1) * deltaWidth,
        slideItemIndex * deltaWidth,
        (slideItemIndex + 1) * deltaWidth,
      ],
      outputRange,
      extrapolate: 'clamp',
    })

export const useScrollDotsInterpolatedStyles = (
  slidesCount: number,
  slideWidth: number,
  scrollEvent: React.MutableRefObject<Animated.Value>
) => {
  const dotsStyles = Array<any>(slidesCount)

  const interpolate = getInterpolator(scrollEvent.current, slideWidth)

  for (let i = 2; i < slidesCount + 2; i += 1) {
    dotsStyles[i] = {
      transform: [
        {
          scale: interpolate(i, [1, 1.2, 1]),
        },
      ],
      opacity: interpolate(i, [0.4, 1, 0.4]),
    }
  }

  return {
    dotsStyles,
  }
}
