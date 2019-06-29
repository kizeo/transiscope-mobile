import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import SubCategories from './SubCategories'

import getIcon from './getIcon'

const Row = ({ config }) => {
  const icon = getIcon(config)

  const subCategories = config.subcategories && config.subcategories[0]

  const [display, toggleDisplay] = useState(false)

  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        disabled={!subCategories}
        onPress={() => toggleDisplay(!display)}
      >
        <View
          style={{
            backgroundColor: config.color,
            width: 60,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon && (
            <FontAwesome
              size={20}
              style={{ padding: 10, color: '#fff' }}
              name={icon}
            />
          )}
        </View>
        <Text style={{ flex: 1, color: '#175259', marginLeft: 10 }}>
          {config.name}
        </Text>
        {!!subCategories && (
          <FontAwesome
            size={20}
            style={{ padding: 10, color: '#3bad78' }}
            name={display ? 'chevron-up' : 'chevron-down'}
          />
        )}
      </TouchableOpacity>
      {subCategories && display && (
        <SubCategories subCategories={subCategories} />
      )}
    </View>
  )
}

export default Row
