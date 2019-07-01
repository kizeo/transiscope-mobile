import React, { useEffect, useState, Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { DangerZone } from 'expo'
const { Lottie } = DangerZone

const SOURCE = require('../assets/animations/loaderTransiscope.json')

export default class LottieAnimations extends Component {
  componentDidMount() {
    this.animation.play()
  }

  render() {
    const { width, height, source } = this.props
    return (
      <View style={styles.animationContainer}>
        <Lottie
          ref={animation => {
            this.animation = animation
          }}
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
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
