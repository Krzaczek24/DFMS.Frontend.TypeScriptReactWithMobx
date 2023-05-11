import React from 'react'
import AuthenticationStore from './AuthenticationStore'
import LoginFormStore from './forms/LoginFormStore'
import RegistrationFormStore from './forms/RegistrationFormStore'
import PermissionStore from './PermissionStore'
import UserStore from './UserStore'

class RootStore {
    loginFormStore: LoginFormStore
    registrationFormStore: RegistrationFormStore

    authenticationStore: AuthenticationStore
    permissionStore: PermissionStore
    userStore: UserStore

    constructor() {
        this.loginFormStore = new LoginFormStore(this)
        this.registrationFormStore = new RegistrationFormStore(this)

        this.authenticationStore = new AuthenticationStore(this)
        this.permissionStore = new PermissionStore(this)
        this.userStore = new UserStore(this)
    }
}

export default RootStore

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)