import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import PageWarp from '../../components/page_warp'
import SXButton from '../../components/button'
import { toJS } from 'mobx'
import { System } from '../../utils'

import './index.less'

type PageStateProps = {
  store: {
    counterStore: IStore.CounterStore
  }
}

interface Index {
  props: PageStateProps;
}

interface ISayProps {
  test: string
  renderHi?: React.ReactNode
  children?: React.ReactNode
}

function Say (props: ISayProps) {
  const { test } = props
  return (
    <View>
      <View>{test}</View>
      <View>{props.renderHi}</View>
      <View>{props.children}</View>
    </View>
  )
}

function RenderHi () {
  return (
    <View>render hi</View>
  )
}

@inject('store')
@observer
class Index extends Component {

  componentDidMount () {
    console.log('2342342342', System)
  }
  
  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  onHander = () => {
    console.log('42342423')
  }

  render () {
    const { counterStore: { counter } } = this.props.store
    console.log('23233232', toJS(this.props.store.counterStore))
    return (
      <PageWarp >
        <View className='index'>
          <View>this is a home</View>
          <SXButton onClick={this.onHander} size='default'>
            1231
          </SXButton>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
          <Button onClick={this.incrementAsync}>Add Async</Button>
          <Text>{counter}</Text>
          <Say test='1231231231231=1=1=1=1=' renderHi={<RenderHi/>}>
            <View>124123412312312</View>
          </Say>
        </View>
      </PageWarp>
    )
  }
}

export default Index
