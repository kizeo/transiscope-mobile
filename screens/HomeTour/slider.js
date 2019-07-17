import React from 'react'
import { View, Button, StyleSheet, Image, ScrollView } from 'react-native'
import FirstSlide from './firstSlide'
import SecondSlide from './secondSlide'
import ThirdSlide from './thirdSlide'

const Slider = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logoByKizeo.png')} resizeMode='contain' />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <FirstSlide />
          <SecondSlide />
          <ThirdSlide />
        </ScrollView>
        <Button style={styles.button} title="Let's get started!" onPress={() => navigation.navigate('Main')} />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50
    },
    logo: {
        height: 100
    },
    button: {
        padding: 10,
        backgroundColor: '#41AC79'
    },
})

export default Slider