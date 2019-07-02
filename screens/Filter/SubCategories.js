import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import getIcon from './getIcon'

const SubCategories = ({ subCategories, add, remove, filters }) => (
  <View style={{ marginLeft: 10 }}>
    {subCategories.options.map(c => {
      const icon = getIcon(c)

      const selected = filters.length === 0 || filters.includes(c.id)

      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (filters.includes(c.id)) remove([c.id])
              else add([c.id])
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: selected ? c.color : '#bcbcbc',
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
          </TouchableOpacity>
        </View>
      )
    })}
  </View>
)

export default SubCategories
