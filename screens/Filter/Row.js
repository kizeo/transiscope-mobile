import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import SubCategories from './SubCategories'

import getIcon from './getIcon'

const getSubCategoriesId = subCategories => {
  if (!subCategories) return []

  return subCategories.options.map(o => o.id)
}

const subCategoriesSelected = (subCategories, cat) => {
  if (!subCategories) return false

  return cat.some(id => getSubCategoriesId(subCategories).includes(id))
}

const Row = ({ config, add, remove, filters }) => {
  const icon = getIcon(config)

  const subCategories = config.subcategories && config.subcategories[0]

  const [display, toggleDisplay] = useState(false)

  const selected =
    filters.length === 0 ||
    filters.includes(config.id) ||
    subCategoriesSelected(subCategories, filters)

  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        disabled={!subCategories}
        onPress={() => toggleDisplay(!display)}
      >
        <TouchableOpacity
          onPress={() => {
            const sIds = getSubCategoriesId(subCategories)
            if (filters.includes(config.id)) remove([config.id, ...sIds])
            else add([config.id, ...sIds])
          }}
        >
          <View
            style={{
              backgroundColor: selected ? config.color : '#bcbcbc',
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
        </TouchableOpacity>
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
        <SubCategories
          subCategories={subCategories}
          add={add}
          remove={remove}
          filters={filters}
        />
      )}
    </View>
  )
}

export default Row
