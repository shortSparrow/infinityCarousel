import { Animated } from 'react-native'
import { SLIDER_ANIMATION_TYPE } from '../../hooks/useScrollImageInterpolatedStyles'

export const getSlideAnimatedStyle = (
  hiddenIndexScrolling: undefined | number,
  i: number,
  interpolate: (
    slideItemIndex: number,
    minValue: number,
    maxValue: number
  ) => Animated.AnimatedInterpolation,
  type: SLIDER_ANIMATION_TYPE
) => {
  switch (type) {
    case SLIDER_ANIMATION_TYPE.ONE:
      return {
        opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 0.99 : interpolate(i, 0.2, 1),
        transform: [
          {
            translateY:
              hiddenIndexScrolling && hiddenIndexScrolling === i ? -24.99 : interpolate(i, 0, -25),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.TWO:
      return {
        transform: [
          {
            scale: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.THREE:
      return {
        opacity: hiddenIndexScrolling && hiddenIndexScrolling === i ? 1 : interpolate(i, 0.6, 1),
        transform: [
          {
            rotateZ:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '-50deg', '0deg'),
          },
        ],
        zIndex: interpolate(i, 0, 1),
      }
    case SLIDER_ANIMATION_TYPE.FOUR:
      return {
        transform: [
          {
            skewY:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '-45deg', '0deg'),
          },
          {
            rotate:
              hiddenIndexScrolling && hiddenIndexScrolling === i
                ? '0deg'
                : interpolate(i, '45deg', '0deg'),
          },
        ],
      }
    case SLIDER_ANIMATION_TYPE.NO_EFFECTS:
      return {}
    // default return NO_EFFECTS type
    default:
      return {}
  }
}
