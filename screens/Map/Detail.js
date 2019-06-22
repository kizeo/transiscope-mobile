import React, { Component } from 'react'
import { Text } from 'react-native'
import { Container } from '../styled'

class PinDetailScreen extends Component {
  state = {}

  render() {
    return (
      <Container>
        <Text>Details</Text>
      </Container>
    )
  }
}

PinDetailScreen.navigationOptions = {
  header: null,
}

export default PinDetailScreen
