import IStore from './IStore'
import RootStore from '.'
import { makeAutoObservable } from 'mobx'

class UserStore implements IStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

export default UserStore