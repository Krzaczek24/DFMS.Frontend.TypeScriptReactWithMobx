import React from 'react'
import AuthenticationStore from './AuthenticationStore'
import LoaderStore from './LoaderStore'
import LoginFormStore from './forms/LoginFormStore'
import RegistrationFormStore from './forms/RegistrationFormStore'
import PermissionStore from './PermissionStore'
import PingStore from './PingStore'
import UserStore from './UserStore'

class RootStore {
    private static storeInstance: RootStore
    public static get instance() { return this.storeInstance ??= new RootStore() }

    loaderStore: LoaderStore
    pingStore: PingStore

    loginFormStore: LoginFormStore
    registrationFormStore: RegistrationFormStore

    authenticationStore: AuthenticationStore
    permissionStore: PermissionStore
    userStore: UserStore

    constructor() {
        this.loaderStore = new LoaderStore(this)
        this.pingStore = new PingStore(this)

        this.loginFormStore = new LoginFormStore(this)
        this.registrationFormStore = new RegistrationFormStore(this)

        this.authenticationStore = new AuthenticationStore(this)
        this.permissionStore = new PermissionStore(this)
        this.userStore = new UserStore(this)
    }
}

export default RootStore

const StoresContext = React.createContext(RootStore.instance)

export const useStores = () => React.useContext(StoresContext)