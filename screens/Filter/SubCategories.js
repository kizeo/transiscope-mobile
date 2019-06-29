import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import getIcon from './getIcon'

const SubCategories = ({ subCategories }) => (
  <View style={{ marginLeft: 10 }}>
    {subCategories.options.map((c) => {
      const icon = getIcon(c)

      return (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: c.color,
                width: 30,
                height: 30,
                borderRadius: 15,
                margin: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {icon && (
                <FontAwesome
                  size={10}
                  style={{ padding: 10, color: '#fff' }}
                  name={icon}
                />
              )}
            </View>
            <Text style={{ color: '#175259', marginLeft: 10 }}>{c.name}</Text>
          </View>
        </View>
      )
    })}
  </View>
)

export default SubCategories
