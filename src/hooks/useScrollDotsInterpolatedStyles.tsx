import { Animated } from 'react-native'
import { getDotsInterpolator } from '../utils/dots/getDotsInterpolator'
import { getDotsAnimatedStyle } from '../utils/dots/getDotsAnimatedStyle'

export enum DOTS_ANIMATION_TYPE {
  SCALE_WITH_OPACITY,
  SCALE,
  MOVE_UP,
}

type UseScrollDotsInterpolatedStyles = {
  slidesCount: number
  slideWidthWithOffset: number
  scrollEvent: Animated.Value
  fakeImagePerSide: number
  dotsAnimationType: DOTS_ANIMATION_TYPE
  customDotsAnimation?: (
    i: number,
    interpolate: (slideItemIndex: number, minValue: number, maxValue: number) => any
  ) => any
}
export const useScrollDotsInterpolatedStyles = ({
  slidesCount,
  slideWidthWithOffset,
  scrollEvent,
  fakeImagePerSide,
  dotsAnimationType = DOTS_ANIMATION_TYPE.SCALE_WITH_OPACITY,
  customDotsAnimation,
}: UseScrollDotsInterpolatedStyles) => {
  const animatedDotsStyles = Array<any>(slidesCount)

  const interpolate = getDotsInterpolator(
    scrollEvent,
    slideWidthWithOffset,
    slidesCount,
    fakeImagePerSide
  )

  for (let i = fakeImagePerSide; i < slidesCount + fakeImagePerSide; i += 1) {
    animatedDotsStyles[i] = {
      ...(customDotsAnimation
        ? customDotsAnimation(i, interpolate)
        : getDotsAnimatedStyle(i, interpolate, dotsAnimationType)),
    }
  }

  return {
    animatedDotsStyles,
  }
}