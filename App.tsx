import React from 'react'
import { SafeAreaView } from 'react-native'
import { Carousel, SliderItem } from './src/Carousel'
import { SLIDER_ANIMATION_TYPE } from './src/useScrollImageInterpolatedStyles'

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

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Carousel
        fakeImagePerSide={2}
        sliders={initialList}
        slideHorizontalOffset={10}
        animationType={SLIDER_ANIMATION_TYPE.THREE}
        // customAnimation={(hiddenIndexScrolling, i, interpolate) => ({
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
      />
    </SafeAreaView>
  )
}

export default App
