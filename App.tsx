import React from 'react'
import { SafeAreaView, View } from 'react-native'
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

const W = 390
// const W = 130 + 20 + 130 + 20 + 80
// const W = 110 + 20 + 110 + 20 + 120
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: W,
          backgroundColor: 'red',
          alignSelf: 'center',
        }}
      >
        <Carousel
          fakeImagePerSide={3}
          sliders={initialList}
          slideHorizontalOffset={15}
          containerWidth={W}
          itemWidth={200}
          sliderPosition={'center'}
          // animationType={SLIDER_ANIMATION_TYPE.THREE}
          dotsAnimation={DOTS_ANIMATION.SCALE}
          customSlideAnimation={() => ({})}
          // customSlideAnimation={(hiddenIndexScrolling, i, interpolate) => ({
          //   opacity:
          //     hiddenIndexScrolling && hiddenIndexScrolling === i ? 0.99 : interpolate(i, 0.2, 1), // TODO add description to interpolate
          //   transform: [
          //     {
          //       translateY:
          //         hiddenIndexScrolling && hiddenIndexScrolling === i
          //           ? -24.99
          //           : interpolate(i, 0, -25),
          //     },
          //   ],
          // })}
          customDotsAnimation={(i, interpolate) => ({
            transform: [
              {
                scale: interpolate(i, 1, 2),
              },
            ],
            // opacity: interpolate(i, 0.4, 1),
          })}
        />
      </View>
    </SafeAreaView>
  )
}

export default App
