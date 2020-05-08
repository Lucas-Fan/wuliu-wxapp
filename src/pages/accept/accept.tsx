import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import Affirm from "../../components/affirm/affirm";
import { observer, inject } from '@tarojs/mobx'
import { NetworkManager, GoodItemsModel, KeyValue } from "../../network/network";
import ListView from "taro-listview";

interface EcceptProps {
  date?: string | "today" | "yesterday";
}

interface EcceptState {
  acceptModel: Array<KeyValue>
}

@inject('goodStore')
@observer
class Eccept extends Taro.Component<EcceptProps, EcceptState> {
  constructor(props) {
    super(props);
    this.state = {
      acceptModel: [],
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
		navigationBarTitleText: "详细信息",
	}

	componentWillMount() { }

	componentWillReact() {
		console.log('componentWillReact')
	}

	componentDidMount() {
		this.fetchDatas();
	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	refList = {};

	/* 
	 * 获得数据方法
	 */
	async fetchDatas() {
    let res: any = [];
    console.log(this.$router.params.type,'this.$router.params.type')
    if (this.$router.params.type == "accept") {
      res = await NetworkManager.getAcceptModel();
    } else {
      res = await NetworkManager.getArriveModel();
    }

		console.log(res,'GoodItemsModel')
		this.setState({
      acceptModel: res,
		})
	}
  insRef = node => {
    this.refList = node;
  };
	render() {
		const { acceptModel } = this.state;
		return (
      <View 
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between" 
        }}
      >
        <Affirm model={acceptModel}></Affirm>
        <Button
          style={{
            width: "90%",
            backgroundColor: "#0099ff",
            color: "#ffffff",
            fontSize: "16px",
            bottom: "10px",
          }}
        >{this.$router.params.type == "accept" ? "确认装车": "确认到达"}</Button>
			</View>
		)
	}
}

export default Eccept as ComponentType
