import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { DangerZone } from 'expo'
const { Lottie } = DangerZone
const SOURCE = require('../assets/animations/loaderTransiscope.json')

const LottieAnimations = ({ width, height, source }) => {
  let animref = useRef(null)
  useEffect(() => {
    if (animref && animref.current) animref.current.play()
  }, [])

  return (
    <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Lottie
        ref={animref}
        style={{
          width,
          height,
          backgroundColor: '#fff',
        }}
        source={source || SOURCE}
      />
    </View>
  )
}

export default LottieAnimations
