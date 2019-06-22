import React from 'react'
import { Text } from 'react-native'
import { Container } from '../styled'

export default function HomeScreen() {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}
