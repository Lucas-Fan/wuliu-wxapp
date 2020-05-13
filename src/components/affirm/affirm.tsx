/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-quotes */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { View, Image, Text } from "@tarojs/components";
import { AtIcon } from 'taro-ui'
import { KeyValue } from "../../network/network";


interface AffirmProps {
  model: Array<KeyValue>
}

interface AffirmState {
  is_punched: boolean
}

class RankItem extends Taro.Component<AffirmProps, AffirmState> {
  static defaultProps = {
    model: [
      {"key": "物资码", "value": "1101010102123209302191"}
    ]
  }
  constructor(props: AffirmProps) {
    super(props);
    this.state = {
      is_punched: false
    };
  }

  renderIcon = (item) => {
    switch (item.key) {
      case '到达地点':
        {return <AtIcon value='map-pin' size='30' color='#3f536e'></AtIcon>;}
        
      case '出发地点':
        {return <AtIcon value='map-pin' size='30' color='#3f536e'></AtIcon>;}
    }
  }


  render() {
    const { model } = this.props;
    return (
      <View
        style={{
          height: "auto",
          margin: "10px 10px",
          background: "rgba(255,255,255,1)",
          borderRadius: "8px",
          border: "0px solid rgba(151,151,151,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          boxSizing: "border-box",
          paddingRight: "10px",
          overflow: "hidden",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.4)"
        }}
      >
        {model.map(item => {
          return (
            <View
              key={item.key}
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "row",
                marginLeft: "11px",
                marginRight: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <View
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column-reverse",
                  marginLeft: "11px",
                  marginRight: "10px",
                  width: "50%",
                  padding: "10px"
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
                    textAlign: "left"
                  }}
                >
                  {item.key}
                </Text>
              </View>
              <View
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily: "PingFangSC-Semibold,PingFang SC",
                    color: "rgba(11,11,51,1)",
                    textAlign: "right",
                  }}
                >
                  {item.value}
                </Text>
                  {this.renderIcon(item)}
              </View>
            </View>
          )
        })}
      </View>
    );
  }
}

export default RankItem;
