import React from 'react'
import LoginStore from './forms/LoginStore'
import RegistrationStore from './forms/RegistrationStore'
import PermissionStore from './PermissionStore'
import UserStore from './UserStore'

class RootStore {
    loginStore: LoginStore
    permissionStore: PermissionStore
    registrationStore: RegistrationStore
    userStore: UserStore

    constructor() {
        this.loginStore = new LoginStore(this)
        this.permissionStore = new PermissionStore(this)
        this.registrationStore = new RegistrationStore(this)
        this.userStore = new UserStore(this)
    }
}

export default RootStore

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)