import { Animated } from 'react-native'
import { FAKE_PER_SIDE } from './Carousel'

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
        opacity: translate && translate === i ? 1 : interpolate(i, 0.6, 1),
        transform: [
          {
            translateY: translate && translate === i ? -25 : interpolate(i, 0, -25),
          },
        ],

        // opacity: interpolate(i, 0.6, 1),
        // transform: [
        //   {
        //     translateY: interpolate(i, 0, -25),
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
