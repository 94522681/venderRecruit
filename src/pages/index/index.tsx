import React, { Component, useEffect, useState } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


function RenderName () {
  let [name, setName] = useState<string>('')
  useEffect(() => {
    setName('long')
  }, [])
  return (
    <View>{name}</View>
  )
}

class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <RenderName/>
      </View>
    )
  }
}

export default Index
