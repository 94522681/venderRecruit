import { View } from '@tarojs/components';
import React from 'react';
import SXButton from 'src/components/button'
import { getUserKey } from 'src/utils/login';

class Login extends React.Component {

  onGetPhoneNumber = (e) => {
    console.log(e)
    getUserKey()
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
