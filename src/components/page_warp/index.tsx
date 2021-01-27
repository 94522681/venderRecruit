import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.less'

interface IProps {
  store?: {
    counterStore: IStore.CounterStore
  }
}

interface IState {

}
@inject('store')
@observer
class PageWarp extends Component<IProps, IState> {
  render () {
    const { store } = this.props
    const { counterStore } = store!
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}
export default PageWarp
