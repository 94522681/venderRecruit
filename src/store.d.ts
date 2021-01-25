import { ICounterStore } from './store/counterStore'

declare namespace IStore {
  type CounterStore = ICounterStore
}


export = IStore
export as namespace IStore