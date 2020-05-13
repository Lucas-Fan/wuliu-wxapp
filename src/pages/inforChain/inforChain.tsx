import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import GoodItem from "../../components/goodItem";
import { observer, inject } from '@tarojs/mobx'
import { NetworkManager, GoodItemsModel, Item } from "../../network/network";
import ListView from "taro-listview";


import './inforChain.less'


interface IRankProps {
  date?: string | "today" | "yesterday";
}

interface IRankState {
	goodCode: string,
	goodName: string,
	GoodItems: Array<Item>,
  isLoaded: boolean;
  hasMore: boolean;
  isEmpty: boolean;
}

@inject('goodStore')
@observer
class InforChain extends Taro.Component<IRankProps, IRankState> {
  constructor(props) {
    super(props);
    this.state = {
      goodCode: "",
      goodName: "",
			GoodItems: [],
      isLoaded: false,
      hasMore: true,
      isEmpty: false
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
		navigationBarTitleText: "物资信息链",
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
	 * 处理
	 */

	/* 
	 * 获得数据方法
	 */
	async fetchDatas() {
		const res = await NetworkManager.getGoodItems();
		console.log(res,'GoodItemsModel')
		this.setState({
			goodCode: this.$router.params.goodCode,
			goodName: this.$router.params.goodName,
      GoodItems: res.GoodItemModel,
		})
	}
  insRef = node => {
    this.refList = node;
  };
	render() {
		const { goodCode, GoodItems, goodName, hasMore, isEmpty } = this.state;
		return (
			<View className='lazy-view'>
          <View
            style={{
              display: "flex",
							alignItems: "center",
							backgroundColor: "#ffffff"
            }}
          >
            <View
              style={{
				fontSize: "16px",
				display: "flex",
				fontFamily: "PingFangSC-Medium,PingFang SC",
				width: "90vw",
				color: "#114750",
				textAlign: "center",
				lineHeight: "60px",
				height: "120px",
				margin: "10px 10px",
				padding: "5px",
				background: "rgba(255,255,255,1)",
				borderRadius: "8px",
				flexWrap: "wrap",
				border: "0px solid rgba(151,151,151,1)",
				boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.4)"
              }}
            >
              <View
                style={{
                  width: "88vw",
                }}
              >
                物资码：{goodCode}
              </View>
              <View
                style={{
                  width: "88vw",
                }}
              >
                物资类型：{goodName}
              </View>
            </View>
          </View>
        <ListView
          lazy
          style={{ height: "calc(100vh - 90px)", backgroundColor: "#ffffff" }}
          ref={node => this.insRef(node)}
          hasMore={hasMore}
          onPullDownRefresh={fn => this.pullDownRefresh(fn)}
          footerLoadedText={"到底了"}
          onScrollToLower={fn => this.onScrollToLower(fn)}
        >


					{GoodItems.map(item => {
						return (
							<GoodItem key={item.id} model={item}></GoodItem>
						)
					})}
        </ListView>
			</View>
		)
	}
}

export default InforChain as ComponentType
