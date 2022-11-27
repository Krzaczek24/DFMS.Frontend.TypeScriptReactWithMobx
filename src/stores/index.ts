import { makeAutoObservable } from 'mobx'
import React from 'react'
import PermissionStore from './PermissionStore'
import UserStore from './UserStore'

export default class RootStore {
    userStore: UserStore
    permissionStore: PermissionStore

    constructor() {
        this.userStore = new UserStore(this)
        this.permissionStore = new PermissionStore(this)
    }
}

export abstract class StoreBase {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }
}

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)