import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Header from './Header'
import Row from './Row'

class Filter extends Component {
  state = {
    state: 0,
    domaines: [],
    sources: [],
  }

  componentDidMount() {
    this.fetchConf()
  }

  fetchConf = async () => {
    this.setState({ state: 1 })

    try {
      const result = await fetch(
        'https://transiscope.gogocarto.fr/api/gogocartojs-conf.json'
      )

      const json = await result.json()

      const domaines = json.data.taxonomy.filter(v => v.name === 'Domaines')[0]
        .options
      const sources = json.data.taxonomy.filter(v => v.name === 'Sources')[0]
        .options

      this.setState({ domaines, sources, state: 0 })
    } catch (error) {
      this.setState({ state: -1 })
    }
  }

  render() {
    const { state, domaines, sources } = this.state

    if (state === 1)
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )

    if (state === -1)
      return (
        <View>
          <Text>Error</Text>
        </View>
      )

    return (
      <ScrollView>
        <Header title="Domaines" />
        {domaines
          .filter(d => d.displayInMenu !== false)
          .map(d => (
            <Row key={d.id} config={d} />
          ))}
        <Header title="Sources" />
        {sources
          .filter(d => d.displayInMenu !== false)
          .map(s => (
            <Row key={s.id} config={s} />
          ))}
      </ScrollView>
    )
  }
}
export default Filter
