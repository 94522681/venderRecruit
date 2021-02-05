import { observable, action, computed } from 'mobx'

export interface ICounterStore {
  counter: number
  increment: Function
  decrement: Function
  incrementAsync: Function
}

class counterStore {
  @observable counter = 0


  @action increment () {
    this.counter++
  }

  @action decrement() {
    this.counter--
  }

  @action incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
}

export default new counterStore()

// const counterStore = observable({
//   counter: 0,
//   counterStore() {
//     this.counter++
//   },
//   increment() {
//     this.counter++
//   },
//   decrement() {
//     this.counter--
//   },
//   incrementAsync() {
//     setTimeout(() => {
//       this.counter++
//     }, 1000)
//   }
// })

// export default counterStore