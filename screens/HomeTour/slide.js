import React from 'react'
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native'

const Slide = ({ text, image }) => {
    const { width } = Dimensions.get('window');
    return (
        <View style={{ width, alignItems: 'center' }}>
            <Image style={styles.image} source={image} resizeMode='contain' />
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300
    },
    text: {
        marginBottom: 20
    }
})

export default Slide