import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import PageWarp from '../../components/page_warp'
import SXButton from '../../components/button'

import './index.less'

type PageStateProps = {
  store: {
    counterStore: IStore.CounterStore
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
    return (
      <PageWarp>
        <View className='index'>
          <View>this is a home</View>
          <SXButton onClick={this.onHander} size='mini'>2342</SXButton>
          <Button onClick={this.increment}>+</Button>
          <Button onClick={this.decrement}>-</Button>
          <Button onClick={this.incrementAsync}>Add Async</Button>
          <Text>{counter}</Text>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
          <View className='box'></View>
        </View>
      </PageWarp>
    )
  }
}

export default Index
