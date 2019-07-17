import React from 'react'
import { Platform, Image } from 'react-native'
import {
  createStackNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home'
import MapScreen from '../screens/Map'
import FilterScreen from '../screens/Filter'
import MapPinDetailScreen from '../screens/Map/Detail'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import Theme from '../constants/Theme'

const logoUri = require('../assets/images/transiscope_logo.png')

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
}

const MapStack = createStackNavigator({
  Map: MapScreen,
  MapPinDetail: MapPinDetailScreen,
})

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-globe" />
  ),
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}
const appStack = createStackNavigator(
  {
    MapStack,
    Filter: FilterScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: (
        <Image
          source={logoUri}
          style={{ width: '100%', height: 28 }}
          resizeMode="contain"
        />
      ),
      headerStyle: {
        backgroundColor: Theme.color.greenLight,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

export default appStack
