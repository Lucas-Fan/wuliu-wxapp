/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { View, Image, Text } from "@tarojs/components";
import IconFont from "../../iconfont";

import { Item } from "../../network/network";


interface IRankItemProps {
  model: Item
}

interface IRankItemState {
  is_punched: boolean
}

class RankItem extends Taro.Component<IRankItemProps, IRankItemState> {
  static defaultProps = {
    model:{
        "id": 101,
        "operation": "生产",
        "address": "济南国帆帐篷有限公司",
        "checkedTime": "2019.11.01 10:20:32"
      }
  }
  constructor(props: IRankItemProps) {
    super(props);
    this.state = {
      is_punched: false
    };
  }

  render() {
    const { model } = this.props;
    return (
      <View
        style={{
          height: "66px",
          margin: "10px 10px",
          background: "rgba(255,255,255,1)",
          borderRadius: "8px",
          border: "0px solid rgba(151,151,151,1)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          paddingRight: "10px",
					overflow: "hidden",
					boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.4)"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
						flexShrink: 0,
						width: "80%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              marginLeft: "11px",
              marginRight: "10px"
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,1)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "200px"
              }}
            >
              {model.checkedTime.slice(0,10)}
            </Text>

            <Text
              style={{
                fontSize: "14px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,1)",
								lineHeight: "14px",
								margin: "5px 0 0 0",
                maxWidth: "200px"
              }}
            >
              {model.address + model.operation}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <View
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "24px",
              alignItems: "flex-start"
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,1)"
              }}
            >
              {model.checkedTime.slice(11,19)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default RankItem;
