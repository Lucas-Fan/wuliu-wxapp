import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { NetworkManager, KeyValue } from "../../network/network";
import ListView from "taro-listview";

interface ProvideProps {
  date?: string | "today" | "yesterday";
}

interface ProvideState {
	goodCode: string,
	itemModel: Array<KeyValue>,
}

@inject('goodStore')
@observer
class InforChain extends Taro.Component<ProvideProps, ProvideState> {
  constructor(props) {
    super(props);
    this.state = {
      goodCode: "",
			itemModel: []
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
	 * 获得当前地址
	 */
  getLocation() {
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        console.log(res,"location");
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18,
          success:function(res) {
            wx.chooseLocation({
              success:function(res) {
                console.log(res,'chooseLocation')
              }
            })
          }
        })
      }
    })
  }

	/* 
	 * 获得数据方法
	 */
	async fetchDatas() {
		const res = await NetworkManager.getProvideModel();
		console.log(res,'itemModel')
		this.setState({
			goodCode: res.goodCode,
      itemModel: res.itemModel,
		})
	}
  insRef = node => {
    this.refList = node;
  };
	render() {
		const { goodCode, itemModel } = this.state;
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
                fontSize: "18px",
								fontFamily: "PingFangSC-Medium,PingFang SC",
								width: "100vw",
                color: "#114750",
								textAlign: "center",
								lineHeight: "60px",
								height: "60px",
								margin: "10px 10px",
								padding: "5px",
								background: "rgba(255,255,255,1)",
								borderRadius: "8px",
								border: "0px solid rgba(151,151,151,1)",
								boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)"
              }}
            >
              {goodCode}
            </View>
          </View>
          <View 
            style={{
              height: "calc(100vh - 90px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              {itemModel.map(item => {
                return (
                  <View
                    key={item.key}
                    style={{
                      height: "66px",
                      margin: "2px 10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        width: "100vw"
                      }}
                    >{item.key}</Text>
                    <Input
                      style={{
                        borderRadius: "4px",
                        width: "100vw",
                        height: "30px",
                        boxSizing: "border-box",
                        border: "1px solid rgba(206,206,206,1)"
                      }}
                    >{item.value}</Input>
                  </View>
                )
              })}
            </View>
            <Button
              style={{
                width: "90%",
                backgroundColor: "#0099ff",
                color: "#ffffff",
                fontSize: "16px",
                bottom: "10px"
              }}
              onClick={() => {
                this.getLocation()
              }}
            >上传图片</Button>
          </View>
			</View>
		)
	}
}

export default InforChain as ComponentType
