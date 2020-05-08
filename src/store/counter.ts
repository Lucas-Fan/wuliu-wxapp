import { observable } from 'mobx'

const goodStore = observable({
  // counter: 0,
  goodCode: 0,
  scanCode(result) {
    this.goodCode = result
  },
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default goodStore