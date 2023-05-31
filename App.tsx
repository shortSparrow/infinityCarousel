import React, { useRef } from 'react'
import { Animated, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Carousel, SliderItem } from './src/Carousel'
import { SLIDER_ANIMATION_TYPE as SLIDE_ANIMATION_TYPE } from './src/useScrollImageInterpolatedStyles'
import { DOTS_ANIMATION as DOTS_ANIMATION_TYPE } from './src/useScrollDotsInterpolatedStyles'

const initialList: SliderItem[] = [
  { id: '1', image: require('./src/image/1.jpeg') },
  { id: '2', image: require('./src/image/2.webp') },
  { id: '3', image: require('./src/image/3.jpeg') },
  { id: '4', image: require('./src/image/4.jpeg') },
  {
    id: '5',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/IAA_2022_20_travelarz.jpg',
    },
  },
]
const CONTAINER_WIDTH = 350
// const W = 130 + 20 + 130 + 20 + 80
// const W = 110 + 20 + 110 + 20 + 120
const App = () => {
  const ref = useRef<ScrollView>(null)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          // width: CONTAINER_WIDTH,
          backgroundColor: 'red',
          alignSelf: 'center',
        }}
      >
        <Carousel
          // containerWidth={CONTAINER_WIDTH}
          fakeImagePerSide={3}
          images={initialList}
          slideHorizontalOffset={10}
          slideWidth={100}
          slideAlign='center'
          slideAnimationType={SLIDE_ANIMATION_TYPE.NO_EFFECTS}
          dotsAnimationType={DOTS_ANIMATION_TYPE.SCALE}
          setScrollViewRef={(r) => {
            ref.current = r
          }}
          slideStyles={{ height: 100, backgroundColor: 'white', paddingHorizontal: 10 }}
          imageStyles={{ borderRadius: 20, width: '100%', height: '100%' }}
          imageProps={{ resizeMode: 'cover' }}
          style={{ paddingTop: 100 }}
          // dotsContainerStyles={{ flexDirection: 'row', marginTop: 20 }}
          // dotStyles={{ width: 10, height: 10, backgroundColor: 'green' }}
          // customDots={(dotsStyles, scrollToIndex) => (
          //   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          //     {dotsStyles.map((dotStyle, index) => (
          //       // <TouchableOpacity
          //       //   key={`sliderDots${index}`}
          //       //   onPress={() => console.log('ref?.current: ', ref?.current)}
          //       // >
          //       <TouchableOpacity key={`sliderDots${index}`} onPress={scrollToIndex(index)}>
          //         <Animated.View
          //           style={[
          //             dotStyle,
          //             { width: 10, height: 10, backgroundColor: 'green', marginHorizontal: 10 },
          //           ]}
          //         />
          //       </TouchableOpacity>
          //     ))}
          //   </View>
          // )}
        />
      </View>
    </SafeAreaView>
  )
}

export default App
