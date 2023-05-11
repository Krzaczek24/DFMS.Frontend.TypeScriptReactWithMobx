import StoreInterface from './StoreInterface'
import RootStore from '.'
import { makeAutoObservable } from 'mobx'

class PermissionStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default PermissionStore