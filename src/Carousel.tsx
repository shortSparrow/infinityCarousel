import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  NativeScrollEvent,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { debounce } from 'lodash'
import { useScrollDotsInterpolatedStyles } from './useScrollDotsInterpolatedStyles'
import { useScrollImageInterpolatedStyles } from './useScrollImageInterpolatedStyles'
import { generateFakeItems } from './helpers/generateFakeItems'

const initialList = [
  { id: '1', image: require('./image/1.jpeg') },
  { id: '2', image: require('./image/2.webp') },
  { id: '3', image: require('./image/3.jpeg') },
  { id: '4', image: require('./image/4.jpeg') },
]

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(SCREEN_WIDTH - 100)

const FAKE_COUNT = 4
export const FAKE_PER_SIDE = FAKE_COUNT / 2

const SLIDE_INTERVAL = 4000
const SLIDE_INTERACTION_DELAY = 1000
const marginHorizontal = 10
const sumMarginHorizontal = marginHorizontal * 2

const MAGIC_COEF = Platform.OS === 'android' ? 0.1 : 0 // need for android. Try to fix

export const Carousel = () => {
  // shows real offset
  const scrolling = useRef(new Animated.Value(0))

  // scrollViewOffset needed for adding custom smooth scroll with animation
  const scrollViewOffset = useRef(
    new Animated.Value(ITEM_WIDTH * FAKE_PER_SIDE + sumMarginHorizontal * FAKE_PER_SIDE)
  ).current

  const intervalId = useRef<number | null>(null)
  const intervalDelayId = useRef<number | null>(null)
  const isScrolling = useRef(false)
  const isDrag = useRef<boolean>(false)
  const ref = useRef<ScrollView>(null)

  // help to avoid style blinking when go from fake items to real
  const [hiddenIndexScrolling, setHiddenIndexScrolling] = useState<undefined | number>(undefined)

  const [list, setList] = useState(generateFakeItems(initialList, FAKE_PER_SIDE))

  const { dotsStyles } = useScrollDotsInterpolatedStyles(
    initialList.length,
    ITEM_WIDTH + sumMarginHorizontal,
    scrolling.current
  )
  const { imageStyles } = useScrollImageInterpolatedStyles(
    list,
    ITEM_WIDTH + sumMarginHorizontal,
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
      (ITEM_WIDTH + sumMarginHorizontal) * FAKE_PER_SIDE +
      marginHorizontal
    const index = Math.round(x / ITEM_WIDTH)

    // scroll to start
    if (index > initialList.length - 1) {
      // FAKE_PER_SIDE - simple way, bu we handle case when user can swipe 2 and more items per one swipe, and navigate to real position
      const toIndex = FAKE_PER_SIDE + index - initialList.length
      hiddenScrollToIndex(toIndex)
    }

    // scroll to end
    if (index <= -1) {
      const toIndex = initialList.length + index + FAKE_PER_SIDE
      hiddenScrollToIndex(toIndex)
    }
  }

  const hiddenScrollToIndex = (toIndex: number) => {
    isScrolling.current = true
    setHiddenIndexScrolling(toIndex)
    scrollViewOffset.setValue(ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal)
    ref.current?.scrollTo({
      x: ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal,
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

  const startAutoPlay = useCallback(
    (delay: number = 0) => {
      intervalDelayId.current = setTimeout(() => {
        intervalId.current = setInterval(() => {
          const x =
            Number(scrolling.current._value) -
            Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
          const index = Math.round(x / ITEM_WIDTH) + 1
          const offset = ITEM_WIDTH * (index + FAKE_PER_SIDE) + (index + FAKE_PER_SIDE) * 20
          // sync drag and autoscroll value
          scrollViewOffset.setValue(scrolling.current._value)
          Animated.timing(scrollViewOffset, {
            toValue: offset,
            duration: 1000,
            useNativeDriver: false,
          }).start()
        }, SLIDE_INTERVAL)
      }, delay)
    },
    [scrollViewOffset]
  )

  const scrollToIndex = (toIndex: number) => () => {
    stopAutoPlay()
    // sync drag and autoscroll value
    scrollViewOffset.setValue(scrolling.current._value)
    Animated.timing(scrollViewOffset, {
      toValue: ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal,
      duration: 1000,
      useNativeDriver: false,
    }).start()

    startAutoPlay(SLIDE_INTERACTION_DELAY)
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
    startAutoPlay()

    return () => {
      stopAutoPlay()
    }
  }, [startAutoPlay, stopAutoPlay])

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          contentOffset={{
            x: ITEM_WIDTH * FAKE_PER_SIDE + sumMarginHorizontal * FAKE_PER_SIDE + MAGIC_COEF,
            y: 0,
          }}
          horizontal
          disableIntervalMomentum
          scrollEventThrottle={16}
          disableScrollViewPanResponder
          snapToInterval={ITEM_WIDTH + sumMarginHorizontal}
          decelerationRate='fast'
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={({ nativeEvent }) => {
            isDrag.current = true
            stopAutoPlay()
          }}
          onScrollEndDrag={({ nativeEvent }) => {
            isDrag.current = false
            // enable if want to avoid blink on fast scroll when go to the last item.
            // It can looks like freeze, I think this happens because IOS Easing not linier
            if (Platform.OS === 'ios') {
              const x =
                nativeEvent.contentOffset.x -
                (ITEM_WIDTH + sumMarginHorizontal) * FAKE_PER_SIDE +
                marginHorizontal
              const index = Math.round(x / ITEM_WIDTH)

              // forbid scroll when user fast scroll to last item
              if (index < 0 || index >= initialList.length) {
                ref.current?.setNativeProps({
                  scrollEnabled: false,
                })
              }
            }
            startAutoPlay(SLIDE_INTERACTION_DELAY)
          }}
          onMomentumScrollEnd={() => {
            if (Platform.OS === 'ios') {
              ref.current?.setNativeProps({
                scrollEnabled: true,
              })
            }
          }}
          onScroll={({ nativeEvent }) => {
            if (isScrolling.current === false && hiddenIndexScrolling) {
              setHiddenIndexScrolling(undefined)
            }
            scrolling.current.setValue(nativeEvent.contentOffset.x)
            debounceScrollHandle(nativeEvent)
          }}
        >
          {imageStyles.map(({ style, image }, i) => (
            <Animated.View
              style={[
                styles.sliderWrapper,
                styles.shadow,
                {
                  marginLeft: i === 0 ? 50 : marginHorizontal,
                  marginRight: i === list.length - 1 ? 50 : marginHorizontal,
                },
                style,
              ]}
              key={image.id}
            >
              <View style={styles.slider}>
                <Image source={image.image} style={{ width: ITEM_WIDTH, borderRadius: 20 }} />
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 100,
    paddingBottom: 50,
  },
  sliderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ITEM_WIDTH,
    height: 300,
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  slider: {},
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
})
