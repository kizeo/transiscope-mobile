import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'

import Header from './Header'
import Row from './Row'

class Filter extends Component {
  state = {
    state: 0,
    domaines: [],
    sources: [],
    filters: this.props.navigation.state.params.filters,
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

  addCategory = category => {
    const { filters } = this.state
    this.setState({
      filters: {
        ...filters,
        categories: [...filters.categories, ...category],
      },
    })
  }

  removeCategory = category => {
    const { filters } = this.state
    this.setState({
      filters: {
        ...filters,
        categories: filters.categories.filter(c => !category.includes(c)),
      },
    })
  }

  addSources = sources => {
    const { filters } = this.state
    this.setState({
      filters: {
        ...filters,
        sources: [...filters.sources, ...sources],
      },
    })
  }

  removeSources = sources => {
    const { filters } = this.state
    this.setState({
      filters: {
        ...filters,
        sources: filters.sources.filter(c => !sources.includes(c)),
      },
    })
  }

  render() {
    const { state, domaines, sources, filters } = this.state

    if (state === 1) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    if (state === -1) {
      return (
        <View>
          <Text>Error</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        <Header title="Domaines" />
        {domaines
          .filter(d => d.displayInMenu !== false)
          .map(d => (
            <Row
              key={d.id}
              config={d}
              add={this.addCategory}
              remove={this.removeCategory}
              filters={filters.categories}
            />
          ))}
        <Header title="Sources" />
        {sources
          .filter(d => d.displayInMenu !== false)
          .map(s => (
            <Row
              key={s.id}
              config={s}
              add={this.addSources}
              remove={this.removeSources}
              filters={filters.sources}
            />
          ))}
      </ScrollView>
    )
  }
}
export default Filter
