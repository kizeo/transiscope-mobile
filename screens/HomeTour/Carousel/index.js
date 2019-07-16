import React, { Fragment, useState, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { Dot } from './styled'
import Slide from './slide'

const Carousel = ({ slides }) => {
    const slider = useRef(null)
    const [slidesNumber, setSlideNumber] = useState(1)


    return (
        <Fragment>
            <ScrollView
                ref={slider}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScrollEndDrag={(e) => console.log(e.nativeEvent)}
            >
                {slides.map((item) => <Slide text={item.text} image={item.file} />)}
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
                <Dot style={{ backgroundColor: '#83878d' }} />
                <Dot />
                <Dot />
            </View>
        </Fragment>
    )
}

export default Carousel
