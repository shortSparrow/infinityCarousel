import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 100,
    paddingBottom: 50,
  },
  sliderWrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: itemWidth,
    height: 300, // TODO
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
  slider: {}, // TODO
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
