import React, { Component } from 'react'
import { View } from '@tarojs/components'

export default class PageWarp extends Component {
  render () {
    return (
      <View>
        this is a pagewarp
        {this.props.children}
      </View>
    )
  }
}
