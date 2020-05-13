import { ComponentType } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { AtIcon, AtMessage, AtImagePicker  } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import { NetworkManager, KeyValue } from "../../network/network";

interface ProvideProps {
  date?: string | "today" | "yesterday"
}

interface ProvideState {
	goodCode: string
	goodName: string
  itemModel: Array<KeyValue>
  latitude: string
  longitude: string
  files: Array<object>
  isFull: boolean
}

@inject('goodStore')
@observer
class InforChain extends Taro.Component<ProvideProps, ProvideState> {
  constructor(props) {
    super(props);
    this.state = {
      goodCode: "",
      goodName: "",
      itemModel: [],
      latitude: "",
      longitude: "",
      files: [],
      isFull: false
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
  
  // 获取图片
  onChange (files) {
    this.setState({
      files
    })
    if (this.state.files.length == 3) {
      this.setState({
        isFull: true
      })
    } else {
      this.setState({
        isFull: false
      })
    }
  }
	/* 
	 * 获得当前地址
	 */
  autoGetLocation() {
    debugger
    const _this = this;
    wx.getLocation({
      type: "wgs84",
      success (res) {
        console.log(res,"location");
        _this.setState({
          latitude: res.latitude,
          longitude: res.longitude
        })
        //弹框
        wx.showModal({
          title: '当前位置',
          content: "纬度:" + _this.state.latitude + ",经度:" + _this.state.longitude,
        })
        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   scale: 18,
        //   success:function(res) {
        //     wx.chooseLocation({
        //       success:function(res) {
        //         console.log(res,'chooseLocation')
        //       }
        //     })
        //   }
        // })
      }
    })
    setTimeout(() => {
      console.log(this.state.latitude,this.state.longitude,"location");
    }, 2000);
  }

  submit = () => {
    type LogLevel = "log" | "info" | "warning" | "error" | "success";
    const type: LogLevel = "success";
  
    Taro.atMessage({
      message: '成功发放',
      type: type,
    })
    Taro.navigateTo({
      url: "/pages/index/index?acount=issuer",
    });
  }

	/* 
	 * 获得数据方法
	 */
	async fetchDatas() {
		const res = await NetworkManager.getProvideModel();
		console.log(res,'itemModel')
		this.setState({
			goodCode: this.$router.params.goodCode,
			goodName: this.$router.params.goodName,
      itemModel: res.itemModel,
    })
    setTimeout(() => {
      console.log(this.$router,'sfds')
    }, 200);
	}
  insRef = node => {
    this.refList = node;
  };
	render() {
		const { goodName, goodCode, itemModel } = this.state;
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
								boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)"
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
          <View 
            style={{
              height: "calc(100vh - 120px)",
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
                if (item.key == "发放地点") {
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
                          width: "80vw",
                          height: "30px",
                          boxSizing: "border-box",
                          border: "1px solid rgba(206,206,206,1)"
                        }}
                        value={item.value}
                      >
                      </Input>
                      <AtIcon value='map-pin' size='30' color='#3f536e'></AtIcon>
                    </View>
                  )
                }
                if (item.key != "发放地点") {
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
                        value={item.value}
                      >
                      </Input>
                    </View>
                  )
                }
              })}
            </View>
            <AtImagePicker
              files={this.state.files}
              onChange={this.onChange.bind(this)}
              showAddBtn={!this.state.isFull}
            />
            <AtMessage></AtMessage>

            <Button
              style={{
                width: "90%",
                backgroundColor: "#0099ff",
                color: "#ffffff",
                fontSize: "16px",
                bottom: "10px"
              }}
              onClick={this.submit}
            >确认发放</Button>
          </View>
			</View>
		)
	}
}

export default InforChain as ComponentType
