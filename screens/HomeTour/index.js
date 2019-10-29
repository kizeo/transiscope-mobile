import React from 'react'
import {
  Container, Logo, Button, BtnTitle
} from './styled'
import Carousel from './Carousel'
import map from '../../assets/images/map.png'
import bulb from '../../assets/images/bulb.png'
import rocket from '../../assets/images/rocket.png'
import logoByKizeo from '../../assets/images/logoByKizeo.png'

const slides = [
  { text: 'Select your city', file: map },
  { text: 'Choose a domain', file: bulb },
  { text: 'Start your eco-journey!', file: rocket },
]

const HomeTour = ({ navigation }) => (
  <Container>
    <Logo source={logoByKizeo} resizeMode="contain" />
    <Carousel slides={slides} />
    <Button onPress={() => navigation.navigate('Main')} color="mediumseagreen">
      <BtnTitle>Let's get started!</BtnTitle>
    </Button>
  </Container>
)

export default HomeTour
