import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import goodStore from './store/counter'

import 'taro-ui/dist/style/index.scss'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  goodStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    "pages": [
      'pages/login/login',
      'pages/index/index',
      'pages/inforChain/inforChain',
      'pages/accept/accept',
      'pages/provide/provide'
    ],
    "window": {
      "backgroundTextStyle": 'light',
      "navigationBarBackgroundColor": '#fff',
      "navigationBarTitleText": 'WeChat',
      "navigationBarTextStyle": 'black'
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于自动填入地址"
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <view>
        <Provider store={store}>
          <Index />
        </Provider>
        <view>
          {store.goodStore.goodCode}
        </view>
      </view>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
