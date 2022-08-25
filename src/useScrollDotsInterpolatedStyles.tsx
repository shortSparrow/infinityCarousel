import { Animated } from 'react-native'
import { FAKE_PER_SIDE } from './Carousel'

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

  for (let i = FAKE_PER_SIDE; i < slidesCount + FAKE_PER_SIDE; i += 1) {
    // dotsStyles[i] = {
    // //   transform: [
    // //     {
    // //       scale: interpolate(i, [1, 1.2, 1]),
    // //     },
    // //   ],
    //   opacity: interpolate(i, [0.4, 1, 0.4]),
    // }
  }

  dotsStyles[2] = {
    // opacity: interpolate(2, [0.4, 1, 0.4]),
    opacity: scrollEvent.current.interpolate({
      inputRange: [1 * slideWidth, 2 * slideWidth, 3 * slideWidth, 4 * slideWidth, 5 * slideWidth],
      outputRange: [0.4, 1, 0.4, 0.4, 1],
      extrapolate: 'clamp',
    }),
  }
  dotsStyles[3] = {
    opacity: interpolate(3, [0.4, 1, 0.4]),
  }
  dotsStyles[4] = {
    opacity: scrollEvent.current.interpolate({
      inputRange: [1 * slideWidth, 2 * slideWidth, 3 * slideWidth, 4 * slideWidth, 5 * slideWidth],
      outputRange: [1, 0.4, 0.4, 1, 0.4],
      extrapolate: 'clamp',
    }),
  }

  return {
    dotsStyles,
  }
}
