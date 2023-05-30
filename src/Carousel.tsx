import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  NativeScrollEvent,
  Platform,
  TouchableOpacity,
  NativeSyntheticEvent,
  ImageSourcePropType,
  ScrollViewProps,
} from 'react-native'
import { debounce } from 'lodash'
import { useScrollDotsInterpolatedStyles } from './useScrollDotsInterpolatedStyles'
import { useScrollImageInterpolatedStyles } from './useScrollImageInterpolatedStyles'
import { generateFakeItems } from './helpers/generateFakeItems'
import { styles } from './Carousel.style'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const FAKE_PER_SIDE = 2
const SLIDE_INTERVAL = 4000
const SLIDE_INTERACTION_DELAY = 1000

export type SliderItem = { id: string; image: ImageSourcePropType }

type Props = ScrollViewProps & {
  sliders: SliderItem[]
  fakeImagePerSide: number
  itemWidth1?: number
  isAutoScroll?: boolean
  autoScrollSlideInterval?: number
  autoScrollSlideInteractionDelay?: number
  offsetBetweenEachSLider?: number
  slideHorizontalOffset?: number

  // onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  // onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  // onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  // onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export const Carousel = (props: Props) => {
  const {
    fakeImagePerSide = FAKE_PER_SIDE,
    itemWidth1,
    isAutoScroll = false,
    autoScrollSlideInterval = SLIDE_INTERVAL,
    autoScrollSlideInteractionDelay = SLIDE_INTERACTION_DELAY,
    sliders,
    slideHorizontalOffset = 10,

    onScroll,
    onMomentumScrollEnd,
    onScrollEndDrag,
    onScrollBeginDrag,

    ...rest
  } = props
  const SumOfTwoSlidesHorizontalOffset = slideHorizontalOffset * 2
  const itemWidth = Math.round((itemWidth1 || SCREEN_WIDTH) - 100)
  const initialOffset =
    itemWidth * fakeImagePerSide + SumOfTwoSlidesHorizontalOffset * fakeImagePerSide
  // shows real offset
  const scrolling = useRef(new Animated.Value(initialOffset))

  // scrollViewOffset needed for adding custom smooth scroll with animation
  const scrollViewOffset = useRef(new Animated.Value(initialOffset)).current

  const intervalId = useRef<number | null>(null)
  const intervalDelayId = useRef<number | null>(null)
  const isScrolling = useRef(false)
  const isDrag = useRef<boolean>(false)
  const ref = useRef<ScrollView>(null)

  // help to avoid style blinking when go from fake items to real
  const [hiddenIndexScrolling, setHiddenIndexScrolling] = useState<undefined | number>(undefined)

  const [list] = useState(generateFakeItems(sliders, fakeImagePerSide))

  const { dotsStyles } = useScrollDotsInterpolatedStyles(
    sliders.length,
    itemWidth + SumOfTwoSlidesHorizontalOffset,
    scrolling.current,
    fakeImagePerSide
  )
  const { imageStyles } = useScrollImageInterpolatedStyles(
    list,
    itemWidth + SumOfTwoSlidesHorizontalOffset,
    scrolling.current,
    hiddenIndexScrolling
  )

  const debounceScrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
    scrollHandle(nativeEvent)
  }, 50)

  // when go to first fake images make momentum hidden scroll to real position
  const scrollHandle = (nativeEvent: NativeScrollEvent) => {
    isScrolling.current = false

    if (isDrag.current === true) return

    const x =
      nativeEvent.contentOffset.x -
      (itemWidth + SumOfTwoSlidesHorizontalOffset) * fakeImagePerSide +
      slideHorizontalOffset
    const index = Math.round(x / (itemWidth + SumOfTwoSlidesHorizontalOffset))

    // scroll to start
    if (index > sliders.length - 1) {
      // FAKE_PER_SIDE - simple way, bu we handle case when user can swipe 2 and more items per one swipe, and navigate to real position
      const toIndex = fakeImagePerSide + index - sliders.length
      hiddenScrollToIndex(toIndex)
    }

    // scroll to end
    if (index <= -1) {
      const toIndex = sliders.length + index + fakeImagePerSide
      hiddenScrollToIndex(toIndex)
    }
  }

  const hiddenScrollToIndex = (toIndex: number) => {
    isScrolling.current = true
    setHiddenIndexScrolling(toIndex)

    ref.current?.scrollTo({
      x: itemWidth * toIndex + toIndex * SumOfTwoSlidesHorizontalOffset,
      y: 0,
      animated: false,
    })
  }

  const stopAutoPlay = useCallback(() => {
    scrollViewOffset.stopAnimation()
    if (intervalId.current) {
      clearInterval(intervalId.current)
    }
    if (intervalDelayId.current) {
      clearTimeout(intervalDelayId.current)
    }

    intervalDelayId.current = null
    intervalId.current = null
  }, [scrollViewOffset])

  const tryStartAutoPlay = useCallback(
    (delay: number = 0) => {
      if (!isAutoScroll) return
      intervalDelayId.current = setTimeout(() => {
        intervalId.current = setInterval(() => {
          const x =
            scrolling.current._value -
            (itemWidth + SumOfTwoSlidesHorizontalOffset) * fakeImagePerSide +
            slideHorizontalOffset
          const index = Math.round(x / (itemWidth + SumOfTwoSlidesHorizontalOffset)) + 1
          const offset = itemWidth * (index + fakeImagePerSide) + (index + fakeImagePerSide) * 20
          // sync drag and autoscroll value
          scrollViewOffset.setValue(scrolling.current._value)
          Animated.timing(scrollViewOffset, {
            toValue: offset,
            duration: 1000,
            useNativeDriver: true,
          }).start()
        }, autoScrollSlideInterval)
      }, delay)
    },
    [
      isAutoScroll,
      autoScrollSlideInterval,
      itemWidth,
      SumOfTwoSlidesHorizontalOffset,
      fakeImagePerSide,
      slideHorizontalOffset,
      scrollViewOffset,
    ]
  )

  const scrollToIndex = (toIndex: number) => () => {
    stopAutoPlay()

    // sync drag and autoscroll value
    scrollViewOffset.setValue(scrolling.current._value)

    Animated.timing(scrollViewOffset, {
      toValue: itemWidth * toIndex + toIndex * SumOfTwoSlidesHorizontalOffset,
      duration: 1000,
      useNativeDriver: true,
    }).start()

    tryStartAutoPlay(autoScrollSlideInteractionDelay)
  }

  const _onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDrag.current = false
    // enable if want to avoid blink on fast scroll when go to the last item.
    // It can looks like freeze, I think this happens because IOS Easing not linier
    if (Platform.OS === 'ios') {
      const x =
        e.nativeEvent.contentOffset.x -
        (itemWidth + SumOfTwoSlidesHorizontalOffset) * fakeImagePerSide +
        slideHorizontalOffset
      const index = Math.round(x / (itemWidth + SumOfTwoSlidesHorizontalOffset))

      // forbid scroll when user fast scroll to last item
      if (index < 0 || index >= sliders.length) {
        ref.current?.setNativeProps({
          scrollEnabled: false,
        })
      }
    }
    tryStartAutoPlay(autoScrollSlideInteractionDelay)
    onScrollEndDrag && onScrollEndDrag(e)
  }

  const _onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (Platform.OS === 'ios') {
      ref.current?.setNativeProps({
        scrollEnabled: true,
      })
    }
    onMomentumScrollEnd && onMomentumScrollEnd(e)
  }

  const _onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    isDrag.current = true
    stopAutoPlay()
    onScrollBeginDrag && onScrollBeginDrag(e)
  }

  const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling.current === false && hiddenIndexScrolling) {
      setHiddenIndexScrolling(undefined)
    }
    scrolling.current.setValue(e.nativeEvent.contentOffset.x)
    debounceScrollHandle(e.nativeEvent)
    onScroll && onScroll(e)
  }

  // smooth scrollig by tap on index, and autoscroll
  useEffect(() => {
    scrollViewOffset.addListener(({ value }) => {
      ref.current?.setNativeProps({
        contentOffset: {
          x: value,
          y: 0,
        },
      })
    })
  }, [scrollViewOffset])

  useEffect(() => {
    tryStartAutoPlay()

    return () => {
      stopAutoPlay()
    }
  }, [tryStartAutoPlay, stopAutoPlay, isAutoScroll])

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          contentOffset={{
            x: initialOffset,
            y: 0,
          }}
          horizontal
          disableIntervalMomentum
          scrollEventThrottle={16}
          disableScrollViewPanResponder
          snapToInterval={itemWidth + SumOfTwoSlidesHorizontalOffset}
          decelerationRate='fast'
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={_onScrollBeginDrag}
          onScrollEndDrag={_onScrollEndDrag}
          onMomentumScrollEnd={_onMomentumScrollEnd}
          onScroll={_onScroll}
          {...rest}
        >
          {imageStyles.map(({ style, image }, i) => (
            <Animated.View
              style={[
                styles.sliderWrapper,
                styles.shadow,
                {
                  width: itemWidth,
                  marginLeft: i === 0 ? 50 : slideHorizontalOffset,
                  marginRight: i === list.length - 1 ? 50 : slideHorizontalOffset,
                },
                style,
              ]}
              key={image.id}
            >
              <View style={styles.slider}>
                <Image source={image.image} style={{ width: itemWidth, borderRadius: 20 }} />
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.dotsContainer}>
        {dotsStyles.map((dotStyle, index) => (
          <TouchableOpacity key={`sliderDots${index}`} onPress={scrollToIndex(index)}>
            <Animated.View style={[styles.dot, dotStyle]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
