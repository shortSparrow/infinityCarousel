import { Animated } from 'react-native'

const getInterpolator =
  (
    animatedValue: Animated.Value,
    slideWidth: number,
    slidesCount: number,
    fakeImagePerSide: number
  ) =>
  (slideItemIndex: number, minValue: number, maxValue: number): Animated.AnimatedInterpolation => {
    const lastIndex = slidesCount + fakeImagePerSide - 1
    const inputRange = [...Array(slidesCount + fakeImagePerSide)].map(
      (_, i) => (i + 1) * slideWidth
    )

    const arr = [...Array(fakeImagePerSide + slidesCount)]

    arr[arr.length - 1] = maxValue
    arr[fakeImagePerSide - 1] = maxValue

    for (let i = fakeImagePerSide - 1; i >= 0; i -= 2) {
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
      case fakeImagePerSide:
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

export enum DOTS_ANIMATION {
  SCALE_WITH_OPACITY,
  SCALE,
  MOVE_UP,
}

const getAnimatedStyle = (
  i: number,
  interpolate: (
    slideItemIndex: number,
    minValue: number,
    maxValue: number
  ) => Animated.AnimatedInterpolation,
  type: DOTS_ANIMATION
) => {
  switch (type) {
    case DOTS_ANIMATION.SCALE_WITH_OPACITY:
      return {
        transform: [
          {
            scale: interpolate(i, 1, 1.2),
          },
        ],
        opacity: interpolate(i, 0.4, 1),
      }

    case DOTS_ANIMATION.SCALE:
      return {
        transform: [
          {
            scale: interpolate(i, 1, 1.4),
          },
        ],
      }
    case DOTS_ANIMATION.MOVE_UP:
      return {
        transform: [
          {
            translateY: interpolate(i, 1, -15),
          },
        ],
      }

    default:
      return {
        transform: [
          {
            scale: interpolate(i, 1, 1.2),
          },
        ],
        opacity: interpolate(i, 0.4, 1),
      }
  }
}

type UseScrollDotsInterpolatedStyles = {
  slidesCount: number
  slideWidth: number
  scrollEvent: Animated.Value
  fakeImagePerSide: number
  type: DOTS_ANIMATION
  customDotsAnimation?: (
    i: number,
    interpolate: (
      slideItemIndex: number,
      minValue: number,
      maxValue: number
    ) => Animated.AnimatedInterpolation
  ) => any
}
export const useScrollDotsInterpolatedStyles = ({
  slidesCount,
  slideWidth,
  scrollEvent,
  fakeImagePerSide,
  type = DOTS_ANIMATION.SCALE_WITH_OPACITY,
  customDotsAnimation,
}: UseScrollDotsInterpolatedStyles) => {
  const dotsStyles = Array<any>(slidesCount)

  const interpolate = getInterpolator(scrollEvent, slideWidth, slidesCount, fakeImagePerSide)

  for (let i = fakeImagePerSide; i < slidesCount + fakeImagePerSide; i += 1) {
    dotsStyles[i] = {
      ...(customDotsAnimation
        ? customDotsAnimation(i, interpolate)
        : getAnimatedStyle(i, interpolate, type)),
    }
  }

  return {
    dotsStyles,
  }
}
