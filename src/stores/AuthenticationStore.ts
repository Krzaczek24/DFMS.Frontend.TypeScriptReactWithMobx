import StoreInterface from './StoreInterface'
import RootStore from '.'
import { IAuthenticationClient, AuthenticationClient, LogonInput, RegisterInput, ErrorResponse, ErrorCode, RefreshInput, AuthenticateOutput } from './../clients/auth/AuthClient'
import { ILogoutClient, LogoutClient } from './../clients/api/ApiClient'
import { makeAutoObservable } from 'mobx'
import { sha512 } from 'sha512-crypt-ts';
import { RegistrationResult } from './forms/RegistrationFormStore'
import { LoginResult } from './forms/LoginFormStore'
import TokenManager, { Token, TokenData } from './../tools/TokenManager'

const authClient = new AuthenticationClient() as IAuthenticationClient
const logoutClient = new LogoutClient() as ILogoutClient

export type Role = 'ADMIN' | 'MODERATOR' | 'MANAGER' | 'USER' | 'BLOCKED'

export class User {
    id!: number
    login!: string
    role!: Role
    permissions!: string[]
    firstName: string | undefined
    lastName: string | undefined
    name!: string
    createdAt!: Date
    lastLoginDate: Date | undefined
    currentLoginDate!: Date

    constructor(tokenData: TokenData) {
        var targetProps = Object.keys(this)

        Object.assign(this, tokenData)

        this.createdAt = new Date(Date.parse(tokenData.createdAt))
        this.currentLoginDate = new Date(Date.parse(tokenData.currentLoginDate))
        if (tokenData.lastLoginDate) {
            this.lastLoginDate = new Date(Date.parse(tokenData.lastLoginDate))
        }
        
        Object.keys(this).forEach(property => {
            if (!targetProps.includes(property)) {
                delete this[property as keyof this]
            }
        })
    }

    hasPermission = (permission: string): boolean => this.permissions?.includes(permission)
    hasAnyPermission = (permissions: string[]): boolean => permissions.some(this.hasPermission)
    hasAllPermissions = (permissions: string[]): boolean => permissions.every(this.hasPermission)
}

class AuthenticationStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        this.userInfo = null
        this.tokenInfo = null
        this.setTokenAndUserData()
        makeAutoObservable(this)
    }

    private userInfo: User | null
    get user() {
        return this.userInfo
    }

    private tokenInfo: Token | null

    get isAuthenticated () {
        return this.tokenInfo && this.tokenInfo.expirationDate > new Date()
    }

    private setTokenAndUserData = () => {
        this.tokenInfo = TokenManager.getToken()
        if (this.tokenInfo?.key) {
            let tokenData = TokenManager.decodeKey(this.tokenInfo.key)
            if (tokenData) {
                this.userInfo = new User(tokenData)
                return
            }
        }

        this.tokenInfo = null
        this.userInfo = null
    }

    register = async() => {
        const { registrationFormStore } = this.rootStore

        if (this.isAuthenticated || registrationFormStore.submitting) {
            return
        }

        registrationFormStore.submitting = true

        const { username, password, firstName, lastName, email } = registrationFormStore.registrationData
        
        try {
            await authClient.register(new RegisterInput({
                username,
                passwordHash: sha512.base64(password),
                firstName,
                lastName,
                email
            }))
            registrationFormStore.result = RegistrationResult.Success
        } catch (exception) {
            if (exception instanceof ErrorResponse && exception.errors?.some(e => e.code === ErrorCode.USERNAME_ALREADY_TAKEN)) {
                registrationFormStore.result = RegistrationResult.UsernameAlreadyTaken
            } else {
                registrationFormStore.result = RegistrationResult.Failure
            }
        }

        registrationFormStore.submitting = false
    }

    login = async() => {
        const { loginFormStore } = this.rootStore

        if (this.isAuthenticated || loginFormStore.submitting) {
            return
        }

        loginFormStore.submitting = true

        const { username, password } = loginFormStore.logonCredentials

        try {
            this.handleAuthResponse((await authClient.login(new LogonInput({
                username,
                passwordHash: sha512.base64(password)
            }))).result)

            loginFormStore.result = this.isAuthenticated ? LoginResult.Success : LoginResult.IncorrectCredentials
        } catch (exception) {
            if (exception instanceof ErrorResponse && exception.errors?.some(e => e.code === ErrorCode.UNAUTHORIZED)) {
                loginFormStore.result = LoginResult.IncorrectCredentials
            } else {
                loginFormStore.result = LoginResult.Failure
            }
        }

        loginFormStore.submitting = false
    }

    refreshToken = async (refreshToken: string) => {
        const response = (await authClient.refreshToken(new RefreshInput({ refreshToken }))).result
        this.handleAuthResponse(response)
    }

    private handleAuthResponse = (response: AuthenticateOutput) => {
        if (response) {
            TokenManager.setKeys(response.accessToken, response.refreshToken)
            this.setTokenAndUserData()
        }
    }

    logout = async () => {
        const loaderStore = this.rootStore.loaderStore;
        loaderStore.show()
        await logoutClient.logout()
        TokenManager.setKeys(null, null)
        this.setTokenAndUserData()
        loaderStore.hide()
    }

    logoutAllMachines = async () => {
        const loaderStore = this.rootStore.loaderStore;
        loaderStore.show()
        await logoutClient.logoutAllMachines()
        TokenManager.setKeys(null, null)
        this.setTokenAndUserData()
        loaderStore.hide()
    }
}

export default AuthenticationStore