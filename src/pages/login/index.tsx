import { View } from '@tarojs/components';
import React from 'react';
import SXButton from 'src/components/button'
import Taro from '@tarojs/taro'
import { getUserKey } from 'src/api/login';
import { Storage } from 'src/adapter/api';

class Login extends React.Component {
  componentDidMount () {
    Storage.setStorage('long', '1231', {expires: 60 * 1000})
  }
  onGetPhoneNumber = (e) => {
    console.log(e)
    // getUserKey()
    // getUserKey()
    // getUserKey()
    // getUserKey()
    console.log('2342342342', Storage.getStorageSync('long'))
  }

  render () {
    return (
      <View>
        <SXButton
          type='primary'
          openType='getPhoneNumber'
          onGetPhoneNumber={this.onGetPhoneNumber}
        >微信登录</SXButton>
      </View>
    )
  }
}

export default Login
