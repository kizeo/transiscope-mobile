import React from 'react'
import { View, Text } from 'react-native'

const Header = ({ title }) => (
  <View
    style={{
      paddingVertical: 15,
      paddingHorizontal: 10,
    }}
  >
    <Text
      style={{
        color: '#3BAD78',
        fontSize: 15,
        fontWeight: '700',
      }}
    >
      {title}
    </Text>
  </View>
)

export default Header
