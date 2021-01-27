import React from 'react'
import { Button, ITouchEvent } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import { debounce } from '../../utils/lodash'

interface IProps extends ButtonProps {
  children?: React.ReactNode
  onClick?: ((event?: ITouchEvent<any>) => void) | undefined
  debounceTime?: number // 按钮防抖时间间隔
}

class SXButton extends React.PureComponent<IProps, any> {
  onClickHander: any
  constructor (props) {
    super(props)

    const { debounceTime = 1000 } = props || {}
    this.onClickHander = debounce(() => {
      const { onClick } = this.props
      if (onClick) onClick()
    }, debounceTime, true)
  }


  render () {
    return (
      <Button
        {...this.props}
        onClick={this.onClickHander}
      >{this.props.children}</Button>
    )
  }
}

// function SXButton (props: IProps) {
//   const {  } = 
//   // button按钮的防抖处理，避免按钮的重复点击
  // const onClickHander = debounce(() => {
  //   const { onClick } = props
  //   if (onClick) onClick()
  // }, 500)

//   return (
//     <Button
//       {...props}
//       onClick={onClickHander}
//     >{props.children}</Button>
//   )
// }

export default SXButton
