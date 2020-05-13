import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtButton, AtMessage  } from 'taro-ui'
import { NetworkManager, UserInfo, KeyValue } from "../../network/network";

import './login.scss'
import { View, Image } from '@tarojs/components';

interface UserInfo {
  acount: string
  password: string
}

interface LoginState {
  acount: string
  password: string
  isLogin: boolean
}

export default class Index extends Taro.Component<UserInfo,LoginState> {
  constructor(props: UserInfo) {
    super(props)
    this.state = {
      acount: '',
      password: '',
      isLogin: false,
    }
  }
  handleChange(type, e) {
    switch (type) {
      case "acount":
        this.setState({
          acount: e
        })
        break;
      case "password":
        this.setState({
          password: e
        })
        break;
      default:
        break;
    }
  }
  onSubmit(event) {
    console.log(this.state.acount, 'acount');
    console.log(this.state.password, 'password');
    const param: UserInfo = {
      "acount": this.state.acount,
      "password": this.state.password
    }
    console.log(param,'param')
    NetworkManager.login(param).then(res => {
      console.log(res,'resdfsds')
      type LogLevel = "log" | "info" | "warning" | "error" | "success";
      let type: LogLevel = "success";
      let msg = "";
      if (param.acount == "" || param.password == "") {
        type = "warning";
        msg = "账户密码不能为空"
      } else {
        switch (res) {
          case '000000':
            Taro.navigateTo({
              url: "/pages/index/index?acount=" + param.acount,
            });
            type = "success";
            msg = "登录成功";
            break;
          case '990001':
            type = "error";
            msg = "密码错误";
            break;
          case '990002':
            type = "error";
            msg = "账户不存在";
            break;
        }
      }
      Taro.atMessage({
        message: msg,
        type: type,
      })
    })

  }
  render() {
    if (!this.state.isLogin) {
      return (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
            height: "100vh"
          }}
        >
          <Image 
            className='at-article__img'
            src={require('../../assets/images/login.png')}
            mode='widthFix'
          />
          <View className='at-article__p'>
            不开放，只供内部测试。
          </View>
          <AtButton onClick={() => this.setState({isLogin: true})}>登录</AtButton>

        </View>
      )
    }
    if (this.state.isLogin) {
      return (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
            height: "100vh"
          }}
        >
          <Image 
            className='at-article__img'
            src={require('../../assets/images/login.png')}
            mode='widthFix'
          />
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
            <AtMessage></AtMessage>
            <AtInput
              required
              name='acount'
              title='账户'
              type='text'
              placeholder='请输入账户'
              value={this.state.acount}
              onChange={this.handleChange.bind(this, 'acount')}
            />
            <AtInput
              required
              name='password'
              title='密码'
              type='password'
              placeholder='密码不能少于6位数'
              value={this.state.password}
              onChange={this.handleChange.bind(this, 'password')}
            />
            <AtButton formType='submit'>登录</AtButton>
          </AtForm>
        </View>
      )
    }
  }
}