import React, { useEffect, useRef, useState } from 'react'
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

const initialList = [
  { id: '1', image: require('./image/1.jpeg') },
  { id: '2', image: require('./image/2.webp') },
  { id: '3', image: require('./image/3.jpeg') },
  { id: '4', image: require('./image/4.jpeg') },
]

const MAGIC_COEF = 0.1 // need for android. Try to fix
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(SCREEN_WIDTH - 100)
console.log('ITEM_WIDTH: ', ITEM_WIDTH)
const FAKE_COUNT = 6
const SLIDE_INTERVAL = 2000
const SLIDE_INTERACTION_DELAY = 4000
export const FAKE_PER_SIDE = FAKE_COUNT / 2
const marginHorizontal = 10
const sumMarginHorizontal = marginHorizontal * 2

const generateFakeItems = (count: number) => {
  const newList = [
    ...initialList.slice(-count).map((item) => ({ ...item, id: item.id + '-fake-start' })),
    ...initialList,
    ...initialList.slice(0, count).map((item) => ({ ...item, id: item.id + '-fake-end' })),
  ]
  return newList
}

export const Carousel = () => {
  const scrolling = useRef(new Animated.Value(0))
  const intervalId = useRef<number | null>(null)
  const intervalDelayId = useRef<number | null>(null)
  const isScrolling = useRef(false)
  const [translate, setTranslate] = useState<undefined | number>(undefined)

  const [list, setList] = useState(generateFakeItems(FAKE_PER_SIDE))

  const ref = useRef<ScrollView>(null)
  const isDrag = useRef<boolean>(false)

  const { dotsStyles } = useScrollDotsInterpolatedStyles(
    initialList.length,
    ITEM_WIDTH + sumMarginHorizontal,
    scrolling
  )
  const { imageStyles } = useScrollImageInterpolatedStyles(
    list,
    ITEM_WIDTH + sumMarginHorizontal,
    scrolling,
    translate
  )

  const debounceScrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
    scrollHandle(nativeEvent)
  }, 50)

  const scrollHandle = (nativeEvent: NativeScrollEvent) => {
    isScrolling.current = false

    if (isDrag.current === true) return
    const x =
      Number(nativeEvent.contentOffset.x.toFixed(2)) -
      (Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) + sumMarginHorizontal) * FAKE_PER_SIDE
    const index = Math.round(x / ITEM_WIDTH)

    // scroll to start
    if (index > initialList.length - 1) {
      isScrolling.current = true
      // FAKE_PER_SIDE - simple way
      const toIndex = FAKE_PER_SIDE + index - initialList.length
      setTranslate(toIndex)

      ref.current?.scrollTo({
        x: ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal,
        y: 0,
        animated: false,
      })

      return
    }
    // scroll to end
    if (index <= -1) {
      isScrolling.current = true
      const toIndex = initialList.length + index + FAKE_PER_SIDE
      setTranslate(toIndex)

      ref.current?.scrollTo({
        x: ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal,
        y: 0,
        animated: false,
      })
      return
    }
  }

  useEffect(() => {
    startAutoPlay()

    return () => {
      stopAutoPlay()
    }
  }, [])

  const stopAutoPlay = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current)
    }
    if (intervalDelayId.current) {
      clearTimeout(intervalDelayId.current)
    }

    intervalDelayId.current = null
    intervalId.current = null
  }

  const startAutoPlay = (delay: number = 0) => {
    intervalDelayId.current = setTimeout(() => {
      intervalId.current = setInterval(() => {
        const x =
          Number(scrolling.current._value) -
          Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
        const index = Math.round(x / ITEM_WIDTH) + 1
        ref.current?.scrollTo({
          x: ITEM_WIDTH * (index + FAKE_PER_SIDE) + (index + FAKE_PER_SIDE) * 20,
          y: 0,
          animated: true,
        })
      }, SLIDE_INTERVAL)
    }, delay)
  }

  const scrollToIndex = (toIndex: number) => () => {
    stopAutoPlay()
    ref.current?.scrollTo({
      x: ITEM_WIDTH * toIndex + toIndex * sumMarginHorizontal,
      y: 0,
      animated: true,
    })
    startAutoPlay(SLIDE_INTERACTION_DELAY)
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          contentOffset={{
            x: ITEM_WIDTH * FAKE_PER_SIDE + sumMarginHorizontal * FAKE_PER_SIDE,
            y: 0,
          }}
          horizontal
          disableIntervalMomentum
          scrollEventThrottle={16}
          disableScrollViewPanResponder
          snapToInterval={ITEM_WIDTH + sumMarginHorizontal + MAGIC_COEF}
          decelerationRate='fast'
          ref={ref}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={({ nativeEvent }) => {
            isDrag.current = true
            stopAutoPlay()
          }}
          onScrollEndDrag={({ nativeEvent }) => {
            isDrag.current = false
            if (Platform.OS === 'ios') {
              const x =
                Number(nativeEvent.contentOffset.x.toFixed(2)) -
                Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
              const index = Math.round(x / ITEM_WIDTH)

              ref.current?.scrollTo({
                x:
                  ITEM_WIDTH * (index + FAKE_PER_SIDE) +
                  (index + FAKE_PER_SIDE) * sumMarginHorizontal,
                y: 0,
                animated: true,
              })
            }
            startAutoPlay(SLIDE_INTERACTION_DELAY)
          }}
          onScroll={({ nativeEvent }) => {
            if (isScrolling.current === false && translate) {
              setTranslate(undefined)
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
