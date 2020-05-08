import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.less'

type PageStateProps = {
  goodStore: {
    counter: number
    goodCode: string
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps
}

@inject('goodStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  scan = () => {
    let result = '';
    const { goodStore } = this.props
    wx.scanCode({
      success: (res) => {
        result = res.result
        Taro.navigateTo({
          url: "/pages/inforChain/inforChain?goodCode=" + result,
        });
      }
    })
  }

  // increment = () => {
  //   const { goodStore } = this.props
  //   goodStore.increment()
  // }

  // decrement = () => {
  //   const { goodStore } = this.props
  //   goodStore.decrement()
  // }

  // incrementAsync = () => {
  //   const { goodStore } = this.props
  //   goodStore.incrementAsync()
  // }

  render () {
    const { goodStore: { counter } } = this.props
    return (
      <View className='index'>
{/*         <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button> */}
        <Button onClick={this.scan}>扫码</Button>
        <Button onClick={() => {
          Taro.navigateTo({
            url: "/pages/inforChain/inforChain"
          });
        }}
        >物资信息链</Button>
        <Button onClick={() => {
          Taro.navigateTo({
            url: "/pages/accept/accept?type=accept",
          });
        }}
        >确认装车</Button>
        <Button onClick={() => {
          Taro.navigateTo({
            url: "/pages/accept/accept?type=arrive",
          });
        }}
        >确认到达</Button>
        <Button onClick={() => {
          Taro.navigateTo({
            url: "/pages/provide/provide",
          });
        }}
        >确认发放</Button>
        {/* <Button onClick={this.incrementAsync}>Add Async</Button> */}
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index  as ComponentType
