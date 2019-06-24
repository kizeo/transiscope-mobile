import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'

const SearchBar = ({ navigation }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#E8E8E8',
      padding: 14,
      borderRadius: 10,
    }}
  >
    <MaterialIcons
      style={{ marginRight: 5, color: '#8E8E93' }}
      size={24}
      name="search"
    />
    <TextInput
      style={{ color: '#8E8E93', fontSize: 17, flex: 1 }}
      placeholder="Rechercher ..."
    />
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Filter')
      }}
    >
      <MaterialIcons
        style={{ marginRight: 5, color: '#8E8E93' }}
        size={24}
        name="filter-list"
      />
    </TouchableOpacity>
  </View>
)

export default withNavigation(SearchBar)
