import React from 'react'
import { Container, Logo, Button } from './styled'
import Carousel from './Carousel'

const slides = [
    { text: 'Select your city', file: require('../../assets/images/map.png') },
    { text: 'Choose a domain', file: require('../../assets/images/bulb.png') },
    { text: 'Start your eco-journey!', file: require('../../assets/images/rocket.png') }
]

const HomeTour = ({ navigation }) => {

    return (
        <Container>
            <Logo source={require('../../assets/images/logoByKizeo.png')} resizeMode='contain' />
            <Carousel slides={slides} />
            <Button title="Let's get started!" onPress={() => navigation.navigate('Main')} />
        </Container>
    )
}

export default HomeTour
