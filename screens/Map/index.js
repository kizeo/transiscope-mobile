import React, { Component } from 'react'
import { MapView, Location, Permissions } from 'expo'
import { Text, ActivityIndicator, View } from 'react-native'
import { Container } from '../styled'
import { PinIconFa, UserIcon, PinIconWrapper } from './styled'
import Categories from '../../data/categories'
import { withNavigation } from 'react-navigation'
import Theme from '../../constants/Theme'

const geoRange = (coords, radiusInKm) => {
  const { latitude, longitude } = coords

  const kmInLongitudeDegree = 111.32 * Math.cos(latitude / (180.0 * Math.PI))

  const deltaLat = radiusInKm / 111.1
  const deltaLong = radiusInKm / kmInLongitudeDegree

  const latitudeGte = latitude - deltaLat
  const latitudeLt = latitude + deltaLat
  const longitudeGte = longitude - deltaLong
  const longitudeLt = longitude + deltaLong

  return {
    latitudeGte,
    latitudeLt,
    longitudeGte,
    longitudeLt,
  }
}

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
      const catFinal = cat || {
        id: null,
        color: Theme.color.greenLight,
        icon: 'fa home',
        name: '',
      }
      return {
        ...d,
        category: {
          id: catFinal.id,
          color: catFinal.color,
          icon: catFinal.icon
            ? catFinal.icon.split(' ')[1].replace('fa-', '')
            : 'home',
          name: catFinal.name,
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
    const { userLocation } = this.state
    const reverseGeo = await Location.reverseGeocodeAsync({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    })
    console.log(reverseGeo)
    const city = reverseGeo && reverseGeo.length ? reverseGeo[0].city : 'france'
    const polygon = geoRange(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      20
    )
    console.log(polygon)
    const rslt = await fetch(
      `https://transiscope.gogocarto.fr/api/elements.json?limit=100&bounds=${
        polygon.longitudeGte
      }%2C${polygon.latitudeGte}%2C${polygon.longitudeLt}%2C${
        polygon.latitudeLt
      }`
    )
    console.log(
      `https://transiscope.gogocarto.fr/api/elements.json?limit=100&bounds=${
        polygon.latitudeGte
      }%2C${polygon.longitudeGte}%2C${polygon.latitudeLt}%2C${
        polygon.longitudeLt
      }`
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
            {data.length &&
              data.map(marker => (
                <MapView.Marker
                  key={marker.id}
                  coordinate={{
                    latitude: parseFloat(marker.geo.latitude),
                    longitude: parseFloat(marker.geo.longitude),
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
