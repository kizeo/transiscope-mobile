import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'
import MainTabNavigator from './MainTabNavigator'
import HomeTour from '../screens/HomeTour'

export default (skipTuto) => {
  const routeConfig = skipTuto
    ? {
      Main: MainTabNavigator,
    }
    : {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      HomeTour,
      Main: MainTabNavigator,
    }

  return createAppContainer(
    createAnimatedSwitchNavigator(
      routeConfig,
      {
        // The previous screen will slide to the bottom while the next screen will fade in
        transition: (
          <Transition.Together>
            <Transition.Out
              type="slide-bottom"
              durationMs={400}
              interpolation="easeIn"
            />
            <Transition.In type="fade" durationMs={500} />
          </Transition.Together>
        ),
      }
    )
  )
}
