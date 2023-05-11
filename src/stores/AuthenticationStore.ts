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

export class User {
    id!: number
    login!: string | undefined
    role!: Role
    permissions!: string[]
    firstName: string | undefined
    lastName: string | undefined
    hasPermission = (permission: string): boolean => this.permissions?.includes(permission)
    hasAnyPermission = (permissions: string[]): boolean => permissions.some(this.hasPermission)
    hasAllPermissions = (permissions: string[]): boolean => permissions.every(this.hasPermission)
}

class TokenData extends User {
    iat!: number
    get issueDate() {
        return new Date(this.iat * 1000)
    }
    exp!: number
    get expirationDate() {
        return new Date(this.exp * 1000)
    }
}

class AuthenticationStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    get token () {
        return localStorage.getItem(tokenLocalStorageKey)
    }

    get isAuthenticated () {
        return this.tokenData != null
    }

    get user() {
        return this.tokenData as User
    }

    get tokenData() {
        if (!this.token) {
            return undefined
        }

        let tokenData = Object.assign(new TokenData(), jwt_decode(this.token) as TokenData)

        if (new Date() > tokenData.expirationDate) {
            localStorage.removeItem(tokenLocalStorageKey)
            return undefined
        }

        return tokenData
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
                localStorage.setItem(tokenLocalStorageKey, token)
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

        localStorage.removeItem(tokenLocalStorageKey)
    }
}

export default AuthenticationStore