import React, { useState, useRef, useEffect } from 'react'
import {
  Animated, ScrollView, View, Dimensions, StyleSheet
} from 'react-native'

import Slide from './slide'

const Carousel = ({ slides }) => {
  const slider = useRef(null)
  const [slideNumber, setSlideNumber] = useState(0)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
  const scrollX = new Animated.Value(0)
  const dotPosition = Animated.divide(scrollX, screenWidth)

  const handleScrollListener = ({ value }) => {
    setSlideNumber(Math.round(value / screenWidth))
  }

  const handleScreenDimensions = ({ screen }) => {
    setScreenWidth(screen.width)
    setTimeout(() => slider.current.scrollTo({ x: slideNumber * screen.width, animated: true }), 0)
  }

  useEffect(() => {
    scrollX.addListener(handleScrollListener)
    Dimensions.addEventListener('change', handleScreenDimensions)
    return () => {
      scrollX.removeListener(handleScrollListener)
      Dimensions.removeEventListener('change', handleScreenDimensions)
    }
  })

  return (
    <View>
      <ScrollView
        ref={slider}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
      >
        {slides.map((item, index) => (
          <Slide text={item.text} image={item.file} key={`slide_${index + 1}`} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {slides.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          })
          return <Animated.View style={{ ...style.dot, opacity }} key={`dot_${index + 1}`} />
        })}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  dot: {
    backgroundColor: '#83878d',
    borderRadius: 50,
    width: 10,
    height: 10,
    marginTop: 0,
    marginHorizontal: 10,
    marginBottom: 20,
  },
})

export default Carousel
