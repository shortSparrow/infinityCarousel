import React, { useRef } from 'react'
import { Animated, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Carousel, SliderItem } from './src/Carousel'
import { SLIDER_ANIMATION_TYPE } from './src/useScrollImageInterpolatedStyles'
import { DOTS_ANIMATION } from './src/useScrollDotsInterpolatedStyles'

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
          fakeImagePerSide={3}
          images={initialList}
          slideHorizontalOffset={10}
          // containerWidth={W}
          slideWidth={100}
          sliderPosition={'center'}
          animationType={SLIDER_ANIMATION_TYPE.NO_EFFECTS}
          dotsAnimation={DOTS_ANIMATION.SCALE}
          setScrollViewRef={(r) => {
            ref.current = r
          }}
          sliderStyles={{ height: 100, backgroundColor: 'white', paddingHorizontal: 10 }}
          imageProps={{ resizeMode: 'cover' }}
          sliderImageStyles={{ borderRadius: 20, width: '100%', height: '100%' }}
          customDots={(dotsStyles, scrollToIndex) => (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {dotsStyles.map((dotStyle, index) => (
                // <TouchableOpacity
                //   key={`sliderDots${index}`}
                //   onPress={() => console.log('ref?.current: ', ref?.current)}
                // >
                <TouchableOpacity key={`sliderDots${index}`} onPress={scrollToIndex(index)}>
                  <Animated.View
                    style={[
                      dotStyle,
                      { width: 10, height: 10, backgroundColor: 'green', marginHorizontal: 10 },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default App
