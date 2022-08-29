import { Animated } from 'react-native'
import { FAKE_PER_SIDE } from './Carousel'

export const getInterpolator =
  (animatedValue: Animated.Value, slideWidth: number, slidesCount: number) =>
  (slideItemIndex: number, minValue: number, maxValue: number): Animated.AnimatedInterpolation => {
    const lastIndex = slidesCount + FAKE_PER_SIDE - 1
    const inputRange = [...Array(slidesCount + FAKE_PER_SIDE)].map((_, i) => (i + 1) * slideWidth)

    const arr = [...Array(FAKE_PER_SIDE + slidesCount)]

    arr[arr.length - 1] = maxValue
    arr[FAKE_PER_SIDE - 1] = maxValue

    for (let i = FAKE_PER_SIDE - 1; i >= 0; i -= 2) {
      arr[i] = maxValue
    }

    const firstImageOutput = arr.map((item) => {
      if (item === undefined) return minValue
      return item
    })

    const lastImageTemp = [...firstImageOutput]
    lastImageTemp.push(minValue)
    const lastImageOutput = lastImageTemp.slice(1)

    // case FAKE_PER_SIDE:
    //   return animatedValue.interpolate({
    //     inputRange,
    //     outputRange: [minValue, maxValue, minValue, minValue, minValue, maxValue],
    //     extrapolate: 'clamp',
    //   })

    // case lastIndex:
    //   return animatedValue.interpolate({
    //     inputRange,
    //     outputRange: [maxValue, minValue, minValue, minValue, maxValue, minValue],
    //     extrapolate: 'clamp',
    //   })

    // case FAKE_PER_SIDE:
    //   return animatedValue.interpolate({
    //     inputRange,
    //     outputRange: [maxValue, minValue, maxValue, minValue, minValue, minValue, maxValue],
    //     extrapolate: 'clamp',
    //   })

    // case lastIndex:
    //   return animatedValue.interpolate({
    //     inputRange,
    //     outputRange: [minValue, maxValue, minValue, minValue, minValue, maxValue, minValue],
    //     extrapolate: 'clamp',
    //   })

    // case lastIndex for 8
    // outputRange: [maxValue, minValue, maxValue, minValue, minValue, minValue, maxValue, minValue],

    switch (slideItemIndex) {
      case FAKE_PER_SIDE:
        return animatedValue.interpolate({
          inputRange,
          outputRange: firstImageOutput,
          extrapolate: 'clamp',
        })

      case lastIndex:
        return animatedValue.interpolate({
          inputRange,
          outputRange: lastImageOutput,
          extrapolate: 'clamp',
        })

      default:
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
  }

export const useScrollDotsInterpolatedStyles = (
  slidesCount: number,
  slideWidth: number,
  scrollEvent: React.MutableRefObject<Animated.Value>
) => {
  const dotsStyles = Array<any>(slidesCount)

  const interpolate = getInterpolator(scrollEvent.current, slideWidth, slidesCount)

  for (let i = FAKE_PER_SIDE; i < slidesCount + FAKE_PER_SIDE; i += 1) {
    dotsStyles[i] = {
      transform: [
        {
          scale: interpolate(i, 1, 1.2),
        },
      ],
      opacity: interpolate(i, 0.4, 1),
    }
  }

  return {
    dotsStyles,
  }
}
