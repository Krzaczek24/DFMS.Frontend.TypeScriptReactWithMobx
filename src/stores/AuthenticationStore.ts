import { IAuthenticationClient, AuthenticationClient, LogonInput, RegisterInput, RegistrationResult } from "../api/ApiClient"
import StoreInterface from "./StoreInterface"
import RootStore from "."
import { makeAutoObservable } from "mobx"
import { sha512 } from "sha512-crypt-ts";
import { ApiException } from "../api/ApiClient"
import jwt_decode from "jwt-decode"

const tokenLocalStorageKey = 'tokenKey'
const api = new AuthenticationClient() as IAuthenticationClient

export type Role = 'ADMIN' | 'MODERATOR' | 'MANAGER' | 'USER' | 'BLOCKED'

type TokenRawData = {
    id: number
    login: string
    role: Role
    permissions: string[]
    firstName: string | undefined
    lastName: string | undefined
    createdAt: string
    lastLoginDate: string | undefined
    currentLoginDate: string
    iat: number
    exp: number
}

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

    constructor(tokenData: TokenRawData) {
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

export type Token = {
    key: string
    issueDate: Date
    expirationDate: Date
}

class AuthenticationStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        this.userData = null
        this.tokenData = null
        this.setTokenAndUserData(this.tokenKey)
        makeAutoObservable(this)
    }

    private userData: User | null
    private tokenData: Token | null

    private get tokenKey () {
        return localStorage.getItem(tokenLocalStorageKey)
    }
    private set tokenKey (value: string | null) {
        if (value) {
            localStorage.setItem(tokenLocalStorageKey, value)
        } else {
            localStorage.removeItem(tokenLocalStorageKey)
        }

        this.setTokenAndUserData(value)
    }

    get isAuthenticated () {
        return this.tokenData && this.tokenData.expirationDate > new Date()
    }

    get user() {
        return this.userData
    }

    get token() {
        return this.tokenData
    }

    private setTokenAndUserData = (tokenKey: string | null) => {
        if (!tokenKey) {
            this.tokenData = null
            this.userData = null
            return
        }

        console.log(jwt_decode(tokenKey))
        let tokenRawData = jwt_decode(tokenKey) as TokenRawData
        this.tokenData = {
            key: tokenKey,
            issueDate: new Date(tokenRawData.iat * 1000),
            expirationDate: new Date(tokenRawData.exp * 1000)
        }
        this.userData = new User(tokenRawData)
    }

    register = async() => {
        const { registrationFormStore } = this.rootStore

        if (this.isAuthenticated || registrationFormStore.submitting) {
            return
        }

        registrationFormStore.submitting = true

        const { username, password, firstName, lastName, email } = registrationFormStore.registrationData
        
        try {
            const response = await api.register(new RegisterInput({
                username,
                passwordHash: sha512.base64(password),
                firstName,
                lastName,
                email
            }))
            registrationFormStore.result = response?.result
        } catch (exception) {
            registrationFormStore.result = RegistrationResult.Failure
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
            let token = await api.authenticate(new LogonInput({
                username,
                passwordHash: sha512.base64(password)
            }))

            if (token) {
                this.tokenKey = token
            }

            loginFormStore.result = this.isAuthenticated ? 'SUCCESS' : 'INCORRECT_CREDENTIALS'
        } catch (exception) {
            loginFormStore.result = (exception as ApiException)?.status === 401 ? 'INCORRECT_CREDENTIALS' : 'ERROR'
        }

        loginFormStore.submitting = false
    }

    logout = () => {
        if (!this.isAuthenticated) {
            return
        }

        this.tokenKey = null
    }
}

export default AuthenticationStore