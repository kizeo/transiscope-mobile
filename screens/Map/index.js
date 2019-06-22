import React, { Component } from 'react'
import { MapView, Location, Permissions } from 'expo'
import { Text, ActivityIndicator } from 'react-native'
import { Container } from '../styled'
import { PinIcon } from './styled'

class MapScreen extends Component {
  state = {
    userLocation: undefined,
    data: [],
  }
  componentDidMount = async () => {
    const userLocation = await this.getLocationAsync()
    console.log(userLocation)
    this.setState({
      userLocation: { ...userLocation.coords },
    })
    this.fetch()
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const location = await Location.getCurrentPositionAsync({})
    return location
  }

  fetch = async () => {
    const rslt = await fetch(
      'https://transiscope.gogocarto.fr/api/elements/search?text=avignon&limit=20'
    )
    const jsonObj = await rslt.json()

    this.setState({
      data: jsonObj.data,
    })
  }

  render() {
    const { data, userLocation } = this.state
    console.log(userLocation)
    return (
      <Container>
        {userLocation && data.length ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Moi"
              description="Ma position"
            />
            {false &&
              data.length &&
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
            {data.length &&
              data.map(marker => (
                <MapView.Marker
                  coordinate={{
                    latitude: marker.geo.latitude,
                    longitude: marker.geo.longitude,
                  }}
                  title={marker.name}
                  description={marker.abstract}
                >
                  <PinIcon name="ios-leaf" />
                </MapView.Marker>
              ))}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </Container>
    )
  }
}

MapScreen.navigationOptions = {
  header: null,
}

export default MapScreen
