import React, { Component, useEffect, useState } from 'react'
import { View } from '@tarojs/components'

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
