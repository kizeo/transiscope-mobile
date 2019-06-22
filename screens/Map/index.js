import React, { Component } from 'react'
import { MapView } from 'expo'
import { Text, ActivityIndicator } from 'react-native'
import { Container } from '../styled'

class HomeScreen extends Component {
  state = {
    data: null,
  }
  componentDidMount = () => {
    this.fetch()
  }
  fetch = async () => {
    console.log('fecth called')
    const rslt = await fetch(
      'https://transiscope.gogocarto.fr/api/elements.json?limit=10'
    )
    const jsonObj = await rslt.json()
    console.log(jsonObj)
    console.log(jsonObj.data)
    this.setState({
      data: jsonObj.data,
    })
  }

  render() {
    const { data } = this.state

    return (
      <Container>
        {data ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: -20.89299,
              longitude: 55.52815,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {data.length &&
              data.map(marker => (
                <MapView.Marker
                  coordinate={{
                    latitude: marker.geo.latitude,
                    longitude: marker.geo.longitude,
                  }}
                  title={marker.name}
                  description={marker.abstract}
                />
              ))}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </Container>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
}

export default HomeScreen
