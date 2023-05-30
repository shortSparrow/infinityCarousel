import React from 'react'
import { SafeAreaView } from 'react-native'
import { Carousel, SliderItem } from './src/Carousel'

const initialList: SliderItem[] = [
  { id: '1', image: require('./src/image/1.jpeg') },
  { id: '2', image: require('./src/image/2.webp') },
  { id: '3', image: require('./src/image/3.jpeg') },
  { id: '4', image: require('./src/image/4.jpeg') },
]

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Carousel fakeImagePerSide={2} sliders={initialList} slideHorizontalOffset={10} />
    </SafeAreaView>
  )
}

export default App
