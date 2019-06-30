import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState, useEffect } from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import createAppNavigator from './navigation/AppNavigator'

const TUO_SETTING_KEY = 'hideTuto'

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [tutoState, setTutoState] = useState({
    tutoLoaded: false,
    hideTuto: false,
  })

  const loadTutoSetting = async () => {
    const hideTuto = await AsyncStorage.getItem(TUO_SETTING_KEY)

    setTutoState({
      tutoLoaded: true,
      hideTuto: hideTuto === 'true',
    })

    await AsyncStorage.setItem(TUO_SETTING_KEY, 'true')
  }

  useEffect(() => {
    loadTutoSetting()
  }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen && !tutoState.tutoLoaded) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  }

  const AppNavigator = createAppNavigator(tutoState.hideTuto)

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  )
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ])
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
