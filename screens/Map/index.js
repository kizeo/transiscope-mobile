import React, { Component } from 'react'
import { MapView, Location, Permissions } from 'expo'
import { Text, ActivityIndicator, View } from 'react-native'
import { Container } from '../styled'
import { PinIconFa, UserIcon, PinIconWrapper } from './styled'
import Categories from '../../data/categories'
import { withNavigation } from 'react-navigation'
import Theme from '../../constants/Theme'

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

  formatedData = data => {
    return data.map(d => {
      const cat = Categories.find(c => c.id + '' === d.categories[0] + '')

      return {
        ...d,
        category: {
          id: cat.id,
          color: cat.color,
          icon: (cat.icon.split(' ') || ['', '.-.'])[1].replace('fa-', ''),
          name: cat.name,
        },
      }
    })
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
    const formated = this.formatedData(jsonObj.data)
    // console.log(formated)
    this.setState({
      data: formated,
    })
  }

  render() {
    const { data, userLocation } = this.state
    const { navigation } = this.props
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
            >
              <PinIconWrapper color="#5492f744">
                <UserIcon name="ios-radio-button-on" />
              </PinIconWrapper>
            </MapView.Marker>

            {data.length &&
              data.map(marker => (
                <MapView.Marker
                  coordinate={{
                    latitude: marker.geo.latitude,
                    longitude: marker.geo.longitude,
                  }}
                  title={marker.name}
                  description={marker.abstract}
                  onCalloutPress={() => navigation.navigate('MapPinDetail')}
                >
                  <PinIconWrapper color={marker.category.color}>
                    <PinIconFa name={marker.category.icon} />
                  </PinIconWrapper>
                </MapView.Marker>
              ))}
          </MapView>
        ) : (
          <View
            style={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={Theme.color.greenDark} />
          </View>
        )}
      </Container>
    )
  }
}

MapScreen.navigationOptions = {
  header: null,
}

export default withNavigation(MapScreen)
