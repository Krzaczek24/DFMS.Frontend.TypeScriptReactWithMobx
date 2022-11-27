import React from 'react'
import LoginStore from './forms/LoginStore'
import RegisterStore from './forms/RegisterStore'
import PermissionStore from './PermissionStore'
import UserStore from './UserStore'

class RootStore {
    loginStore: LoginStore
    permissionStore: PermissionStore
    registerStore: RegisterStore
    userStore: UserStore

    constructor() {
        this.loginStore = new LoginStore(this)
        this.permissionStore = new PermissionStore(this)
        this.registerStore = new RegisterStore(this)
        this.userStore = new UserStore(this)
    }
}

export default RootStore

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)