import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.less'

type PageStateProps = {
  goodStore: {
    counter: number
    goodCode: string
    acount: string
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

type PageStateState = {
  url: string
}

interface Index {
  props: PageStateProps
}





@inject('goodStore')
@observer
class Index extends Taro.Component<PageStateProps, PageStateState> {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }
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

  componentDidMount () {
    let temp = "";
    switch (this.$router.params.acount) {
      case "trans":
        temp = "/pages/accept/accept?type=arrive"
        break;
      case "issuer":
        temp = "/pages/provide/provide?"
        break;
      case "tracing":
        temp = "/pages/inforChain/inforChain?"
        break;
    }
    this.setState({
      url: temp
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  accept = () => {
    this.setState({
      url: "/pages/accept/accept?type=accept"
    });
    this.scan()
  }
  arrive = () => {
    this.setState({
      url: "/pages/accept/accept?type=arrive"
    });
    this.scan()
  }
  scan = () => {
    let result = '1101010102123209302192';
    // Taro.navigateTo({
    //   url: this.state.url + "&goodName=30m²帐篷&goodCode=" + result,
    // });
    wx.scanCode({
      success: (res) => {
        result = res.result
        Taro.navigateTo({
          url: this.state.url + "&goodName=30m²帐篷&goodCode=" + result,
        });
      }
    })
  }


  render () {

      if (this.$router.params.acount == "trans") {
        return (
          <View className='index'>
            <Button onClick={this.accept}>装车出库扫码</Button>
            <Button onClick={this.arrive}>到达入库扫码</Button>
          </View>
        )
      }
      if (this.$router.params.acount == "issuer"){
        return (
          <View className='index'>
            <Button onClick={this.scan}>扫码发放</Button>
          </View>
        )
      }
      if (this.$router.params.acount == "tracing"){
        return (
          <View className='index'>
            <Button onClick={this.scan}>溯源发放</Button>
          </View>
        )
      }
  }
}

export default Index  as ComponentType
