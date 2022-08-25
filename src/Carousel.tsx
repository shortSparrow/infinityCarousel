// import React, { useRef, useState } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Dimensions,
//   Animated,
//   NativeScrollEvent,
// } from 'react-native'
// import { debounce } from 'lodash'

// const initialList = [
//   { id: '1', image: require('./image/1.jpeg') },
//   { id: '2', image: require('./image/2.webp') },
//   { id: '3', image: require('./image/3.jpeg') },
// ]

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const ITEM_WIDTH = SCREEN_WIDTH

// console.log('ITEM_WIDTH: ', ITEM_WIDTH) // 411.42857142857144

// export const Carousel = () => {
//   const [list, setList] = useState([
//     { id: '3-fake', image: require('./image/3.jpeg') },
//     ...initialList,
//     { id: '1-fake', image: require('./image/1.jpeg') },
//   ])
//   const ref = useRef<ScrollView>(null)
//   const isDrag = useRef<boolean>(false)

//   const scrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
//     if (isDrag.current === true) return

//     console.log('X: ', nativeEvent.contentOffset.x)

//     const internalList = list
//     const x =
//       Number(nativeEvent.contentOffset.x.toFixed(2)) -
//       Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2))
//     const totalWidth = Number((ITEM_WIDTH * (internalList.length - 1)).toFixed(2))
//     const index = Math.round(x / ITEM_WIDTH)
//     //   console.log('isRightCorner: ', isRightCorner)
//     console.log('X: ', x)
//     console.log('totalWidth: ', totalWidth)
//     console.log('index: ', index)

//     // scroll to end
//     if (index === -1) {
//       ref.current?.scrollTo({ x: ITEM_WIDTH * (list.length - 2), y: 0, animated: false })
//     }

//     // scroll to start
//     if (index === list.length - 2) {
//       ref.current?.scrollTo({ x: ITEM_WIDTH, y: 0, animated: false })
//     }
//   }, 50)
//   return (
//     <ScrollView
//       contentOffset={{ x: ITEM_WIDTH, y: 0 }}
//       horizontal
//       disableIntervalMomentum
//       pagingEnabled
//       ref={ref}
//       persistentScrollbar
//       onMomentumScrollEnd={(e) => {
//         // console.log('onMomentumScrollEnd: ', e.nativeEvent)
//       }}
//       onScrollBeginDrag={() => {
//         console.log('onScrollBeginDrag: ')
//         isDrag.current = true
//       }}
//       onScrollEndDrag={() => {
//         console.log('onScrollEndDrag: ')
//         isDrag.current = false
//       }}
//       onScroll={({ nativeEvent }) => {
//         scrollHandle(nativeEvent)
//       }}
//     >
//       {list.map((item) => (
//         <Image source={item.image} key={item.id} style={{ width: SCREEN_WIDTH }} />
//       ))}
//     </ScrollView>
//   )
// }

// import React, { useRef, useState } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Dimensions,
//   Animated,
//   NativeScrollEvent,
// } from 'react-native'
// import { debounce } from 'lodash'

// const initialList = [
//   { id: '1', image: require('./image/1.jpeg') },
//   { id: '2', image: require('./image/2.webp') },
//   { id: '3', image: require('./image/3.jpeg') },

//   { id: '4', image: require('./image/1.jpeg') },
//   { id: '5', image: require('./image/2.webp') },
//   { id: '6', image: require('./image/3.jpeg') },
// ]

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const ITEM_WIDTH = SCREEN_WIDTH - 100

// console.log('ITEM_WIDTH: ', ITEM_WIDTH) // 411.42857142857144

// export const Carousel = () => {
//   const [list, setList] = useState([...initialList])
//   const ref = useRef<ScrollView>(null)
//   const isDrag = useRef<boolean>(false)

//   const gap = 20
//   return (
//     <ScrollView
//       contentOffset={{ x:  ITEM_WIDTH - 20, y: 0 }}
//       horizontal
//       disableIntervalMomentum
//       decelerationRate='fast'
//       snapToOffsets={[
//         0,
//         ITEM_WIDTH - 20,
//         ITEM_WIDTH * 2,
//         ITEM_WIDTH * 3 + 20,
//         ITEM_WIDTH * 4 + 40,
//         ITEM_WIDTH * 5 + 60,
//       ]}
//       ref={ref}
//       persistentScrollbar
//       onMomentumScrollEnd={(e) => {
//         // console.log('onMomentumScrollEnd: ', e.nativeEvent)
//       }}
//       onScrollBeginDrag={() => {
//         console.log('onScrollBeginDrag: ')
//         isDrag.current = true
//       }}
//       onScrollEndDrag={() => {
//         console.log('onScrollEndDrag: ')
//         isDrag.current = false
//       }}
//       onScroll={({ nativeEvent }) => {
//         // scrollHandle(nativeEvent)
//       }}
//     >
//       {list.map((item) => (
//         <View
//           style={{
//             width: ITEM_WIDTH,
//             marginHorizontal: 10,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           key={item.id}
//         >
//           <View
//             style={{
//               //   width: SCREEN_WIDTH - 100,
//               backgroundColor: 'red',
//               height: '100%',
//             }}
//           >
//             {/* <Image source={item.image} style={{ borderRadius: 20, width: ITEM_WIDTH }} resizeMode='contain' /> */}
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   )
// }

// import React, { useRef, useState } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Dimensions,
//   Animated,
//   NativeScrollEvent,
// } from 'react-native'
// import { debounce } from 'lodash'

// const initialList = [
//   { id: '1', image: require('./image/1.jpeg') },
//   { id: '2', image: require('./image/2.webp') },
//   { id: '3', image: require('./image/3.jpeg') },

// //   { id: '4', image: require('./image/1.jpeg') },
// //   { id: '5', image: require('./image/2.webp') },
// //   { id: '6', image: require('./image/3.jpeg') },
// ]

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const ITEM_WIDTH = SCREEN_WIDTH - 100

// console.log('ITEM_WIDTH: ', ITEM_WIDTH) // 411.42857142857144
// const FAKE_COUNT = 3
// export const Carousel = () => {
//   const [list, setList] = useState([
//     // { id: '4-fake', image: require('./image/2.webp') },
//     { id: '3-fake', image: require('./image/3.jpeg') },
//     ...initialList,
//     { id: '1-fake', image: require('./image/1.jpeg') },
//     { id: '2-fake', image: require('./image/2.webp') },
//   ])
//   const ref = useRef<ScrollView>(null)
//   const isDrag = useRef<boolean>(false)

//   const scrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
//     if (isDrag.current === true) return

//     console.log('X: ', nativeEvent.contentOffset.x)

//     const internalList = list
//     const x =
//       Number(nativeEvent.contentOffset.x.toFixed(2)) -
//       Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2))
//     const totalWidth = Number((ITEM_WIDTH * (internalList.length - 1)).toFixed(2))
//     const index = Math.round(x / ITEM_WIDTH)
//     //   console.log('isRightCorner: ', isRightCorner)
//     console.log('X: ', x)
//     console.log('totalWidth: ', totalWidth)
//     console.log('index: ', index)

//     // scroll to end
//     if (index === -1) {
//       ref.current?.scrollTo({
//         x: ITEM_WIDTH * (list.length - FAKE_COUNT) + (list.length - FAKE_COUNT) * 20,
//         y: 0,
//         animated: false,
//       })
//     }

//     // scroll to start
//     if (index === list.length - FAKE_COUNT) {
//       ref.current?.scrollTo({ x: ITEM_WIDTH + 20, y: 0, animated: false })
//     }
//   }, 50)

//   return (
//     <ScrollView
//       contentOffset={{ x: ITEM_WIDTH + 20, y: 0 }}
//       horizontal
//       disableIntervalMomentum
//       pagingEnabled
//       snapToInterval={ITEM_WIDTH + 20}
//       //   snapToOffsets={[
//       //     0,
//       //     ITEM_WIDTH - 20,
//       //     ITEM_WIDTH * 2,
//       //     ITEM_WIDTH * 3 + 20,
//       //     ITEM_WIDTH * 4 + 40,
//       //     ITEM_WIDTH * 5 + 60,
//       //   ]}
//       ref={ref}
//       persistentScrollbar
//       onMomentumScrollEnd={(e) => {
//         // console.log('onMomentumScrollEnd: ', e.nativeEvent)
//       }}
//       onScrollBeginDrag={() => {
//         console.log('onScrollBeginDrag: ')
//         isDrag.current = true
//       }}
//       onScrollEndDrag={() => {
//         console.log('onScrollEndDrag: ')
//         isDrag.current = false
//       }}
//       onScroll={({ nativeEvent }) => {
//         scrollHandle(nativeEvent)
//       }}
//     >
//       {list.map((item, i) => (
//         <View
//           style={{
//             width: ITEM_WIDTH,
//             // marginHorizontal: 10,
//             marginLeft: i == 0 ? 50 : 10,
//             marginRight: i == list.length - 1 ? 50 : 10,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           key={item.id}
//         >
//           <View
//             style={{
//               //   width: SCREEN_WIDTH - 100,
//               backgroundColor: 'red',
//               height: '100%',
//             }}
//           >
//             <Image
//               source={item.image}
//               style={{ borderRadius: 20, width: ITEM_WIDTH }}
//               resizeMode='contain'
//             />
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   )
// }

// import React, { useEffect, useRef, useState } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Dimensions,
//   Animated,
//   NativeScrollEvent,
//   StyleSheet,
//   Platform,
// } from 'react-native'
// import { debounce } from 'lodash'
// import { useScrollDotsInterpolatedStyles } from './useScrollDotsInterpolatedStyles'

// const initialList = [
//   { id: '1', image: require('./image/1.jpeg') },
//   { id: '2', image: require('./image/2.webp') },
//   { id: '3', image: require('./image/3.jpeg') },

//   //   { id: '4', image: require('./image/1.jpeg') },
//   //   { id: '5', image: require('./image/2.webp') },
//   //   { id: '6', image: require('./image/3.jpeg') },
// ]

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const ITEM_WIDTH = SCREEN_WIDTH - 100

// console.log('SCREEN_WIDTH: ', SCREEN_WIDTH) // 390

// const FAKE_COUNT = 4
// const FAKE_PER_SIDE = FAKE_COUNT / 2
// const marginHorizontal = 10

// const generateFakeItems = (count: number) => {
//   const newList = [
//     ...initialList.slice(-count).map((item) => ({ ...item, id: item.id + '-fake-start' })),
//     ...initialList,
//     ...initialList.slice(0, count).map((item) => ({ ...item, id: item.id + '-fake-end' })),
//   ]
//   return newList
// }

// export const Carousel = () => {
//   const scrolling = useRef(new Animated.Value(0))

//   const [list, setList] = useState(generateFakeItems(2))

//   const ref = useRef<ScrollView>(null)
//   const isDrag = useRef<boolean>(false)

//   const { dotsStyles } = useScrollDotsInterpolatedStyles(initialList.length, ITEM_WIDTH, scrolling)

//   const debounceScrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
//     scrollHandle(nativeEvent)
//   }, 50)

//   const scrollHandle = (nativeEvent: NativeScrollEvent) => {
//     if (isDrag.current === true) return

//     const x =
//       Number(nativeEvent.contentOffset.x.toFixed(2)) -
//       Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
//     const index = Math.round(x / ITEM_WIDTH)
//     console.log('index: ', index)

//     // scroll to start
//     if (index > initialList.length - 1) {
//       ref.current?.scrollTo({
//         x:
//           ITEM_WIDTH * (initialList.length - index + FAKE_PER_SIDE) +
//           (initialList.length - index + FAKE_PER_SIDE) * 20,
//         y: 0,
//         animated: false,
//       })
//       return
//     }
//     // scroll to end
//     if (index <= -1) {
//       ref.current?.scrollTo({
//         x:
//           ITEM_WIDTH * (initialList.length + index + FAKE_PER_SIDE) +
//           (initialList.length + index + FAKE_PER_SIDE) * 20,
//         y: 0,
//         animated: false,
//       })
//       return
//     }
//   }

//   return (
//     <>
//       <ScrollView
//         bounces={false}
//         contentOffset={{ x: ITEM_WIDTH * 2 + marginHorizontal * 4, y: 0 }}
//         horizontal
//         disableIntervalMomentum
//         scrollEventThrottle={16}
//         disableScrollViewPanResponder
//         snapToInterval={ITEM_WIDTH + marginHorizontal * 2}
//         decelerationRate='fast'
//         ref={ref}
//         persistentScrollbar
//         onScrollBeginDrag={({ nativeEvent }) => {
//           console.log('onScrollBeginDrag: ')
//           isDrag.current = true
//         }}
//         onScrollEndDrag={({ nativeEvent }) => {
//           console.log('onScrollEndDrag: ')
//           isDrag.current = false
//           if (Platform.OS === 'ios') {
//             const x =
//               Number(nativeEvent.contentOffset.x.toFixed(2)) -
//               Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
//             const index = Math.round(x / ITEM_WIDTH)
//             console.log('index: ', index)

//             ref.current?.scrollTo({
//               x: ITEM_WIDTH * (index + FAKE_PER_SIDE) + (index + FAKE_PER_SIDE) * 20,
//               y: 0,
//               animated: true,
//             })
//           }
//         }}
//         onScroll={({ nativeEvent }) => {
//           scrolling.current.setValue(nativeEvent.contentOffset.x)
//           debounceScrollHandle(nativeEvent)
//         }}
//         onMomentumScrollEnd={({ nativeEvent }) => {
//           console.log('onMomentumScrollEnd: ')
//         }}
//       >
//         {list.map((item, i) => (
//           <View
//             style={[
//               styles.sliderWrapper,
//               {
//                 marginLeft: i == 0 ? 50 : marginHorizontal,
//                 marginRight: i == list.length - 1 ? 50 : marginHorizontal,
//               },
//             ]}
//             key={item.id}
//           >
//             <View style={styles.slider}>
//               <Image
//                 source={item.image}
//                 style={{ borderRadius: 20, width: ITEM_WIDTH }}
//                 resizeMode='contain'
//               />
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.dotsContainer}>
//         {dotsStyles.map((dotStyle, index) => (
//           <Animated.View key={`sliderDots${index}`} style={[styles.dot, dotStyle]} />
//         ))}
//       </View>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   sliderWrapper: {
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: ITEM_WIDTH,
//   },
//   slider: {
//     backgroundColor: 'red',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 10,
//     backgroundColor: 'lightgrey',
//     marginHorizontal: 10,
//   },
// })

import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
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

const initialList = [
  { id: '1', image: require('./image/1.jpeg') },
  { id: '2', image: require('./image/2.webp') },
  { id: '3', image: require('./image/3.jpeg') },

  //   { id: '4', image: require('./image/1.jpeg') },
  //   { id: '5', image: require('./image/2.webp') },
  //   { id: '6', image: require('./image/3.jpeg') },
]

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = SCREEN_WIDTH - 100

// console.log('SCREEN_WIDTH: ', SCREEN_WIDTH) // 390

const FAKE_COUNT = 4
export const FAKE_PER_SIDE = FAKE_COUNT / 2
const marginHorizontal = 10

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
  const intervalId = useRef(null)

  const [list, setList] = useState(generateFakeItems(2))

  const ref = useRef<ScrollView>(null)
  const isDrag = useRef<boolean>(false)

  const { dotsStyles } = useScrollDotsInterpolatedStyles(
    initialList.length,
    ITEM_WIDTH + marginHorizontal * 2,
    scrolling
  )

  const debounceScrollHandle = debounce((nativeEvent: NativeScrollEvent) => {
    scrollHandle(nativeEvent)
  }, 50)

  const scrollHandle = (nativeEvent: NativeScrollEvent) => {
    if (isDrag.current === true) return

    const x =
      Number(nativeEvent.contentOffset.x.toFixed(2)) -
      Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
    const index = Math.round(x / ITEM_WIDTH)
    console.log('index: ', index)

    // scroll to start
    if (index > initialList.length - 1) {
      ref.current?.scrollTo({
        x:
          ITEM_WIDTH * (initialList.length - index + FAKE_PER_SIDE) +
          (initialList.length - index + FAKE_PER_SIDE) * 20,
        y: 0,
        animated: false,
      })
      return
    }
    // scroll to end
    if (index <= -1) {
      ref.current?.scrollTo({
        x:
          ITEM_WIDTH * (initialList.length + index + FAKE_PER_SIDE) +
          (initialList.length + index + FAKE_PER_SIDE) * 20,
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
    console.log('STOP AUTOPLAY')
    clearInterval(intervalId.current)
    intervalId.current = null
  }

  const startAutoPlay = (delay: number = 0) => {
    console.log('START AUTOPLAY')
    intervalId.current = setInterval(() => {
      //   console.log('scrolling.current: ', scrolling.current._value)
      const x =
        Number(scrolling.current._value) -
        Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
      const index = Math.round(x / ITEM_WIDTH) + 1

      //   console.log('index: ', index)
      console.log('AUTOPLAY')
      ref.current?.scrollTo({
        x: ITEM_WIDTH * (index + FAKE_PER_SIDE) + (index + FAKE_PER_SIDE) * 20,
        y: 0,
        animated: true,
      })
    }, 2000 + delay)
  }

  const scrollToIndex = (toIndex: number) => () => {
    stopAutoPlay()
    ref.current?.scrollTo({
      x: ITEM_WIDTH * toIndex + toIndex * 20,
      y: 0,
      animated: true,
    })
    startAutoPlay(2000)
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView
        bounces={false}
        contentOffset={{ x: ITEM_WIDTH * 2 + marginHorizontal * 4, y: 0 }}
        horizontal
        disableIntervalMomentum
        scrollEventThrottle={16}
        disableScrollViewPanResponder
        snapToInterval={ITEM_WIDTH + marginHorizontal * 2}
        decelerationRate='fast'
        ref={ref}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={({ nativeEvent }) => {
          console.log('onScrollBeginDrag: ')
          isDrag.current = true
          stopAutoPlay()
        }}
        onScrollEndDrag={({ nativeEvent }) => {
          console.log('onScrollEndDrag: ')
          isDrag.current = false
          if (Platform.OS === 'ios') {
            const x =
              Number(nativeEvent.contentOffset.x.toFixed(2)) -
              Number(Number(ITEM_WIDTH.toFixed(2)).toFixed(2)) * FAKE_PER_SIDE
            const index = Math.round(x / ITEM_WIDTH)
            console.log('index: ', index)

            ref.current?.scrollTo({
              x: ITEM_WIDTH * (index + FAKE_PER_SIDE) + (index + FAKE_PER_SIDE) * 20,
              y: 0,
              animated: true,
            })
          }
          startAutoPlay(2000)
        }}
        onScroll={({ nativeEvent }) => {
          scrolling.current.setValue(nativeEvent.contentOffset.x)
          debounceScrollHandle(nativeEvent)
        }}
        // onMomentumScrollEnd={({ nativeEvent }) => {
        //   console.log('onMomentumScrollEnd: ')
        // }}
      >
        {list.map((item, i) => (
          <View
            style={[
              styles.sliderWrapper,
              {
                marginLeft: i == 0 ? 50 : marginHorizontal,
                marginRight: i == list.length - 1 ? 50 : marginHorizontal,
              },
            ]}
            key={item.id}
          >
            <View style={styles.slider}>
              <Image source={item.image} style={{ borderRadius: 20, width: ITEM_WIDTH }} />
            </View>
          </View>
        ))}
      </ScrollView>

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
    marginTop: 100,
  },
  sliderWrapper: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: ITEM_WIDTH,
    // height: 300
  },
  slider: {
    // backgroundColor: 'red',
  },
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
