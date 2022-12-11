import { IAuthenticationClient, AuthenticationClient, IUser, LogonInput, RegisterInput } from '../api/ApiClient'
import { BehaviorSubject } from 'rxjs'
import { sha512 } from 'sha512-crypt-ts';
import jwt_decode from 'jwt-decode'

const api = new AuthenticationClient() as IAuthenticationClient
const tokenLocalStorageKey = 'tokenKey'
const tokenSubject = new BehaviorSubject<string>(localStorage.getItem(tokenLocalStorageKey) ?? '')
const getTokenData = () => tokenSubject.value?.length > 0 ? Object.assign(new TokenData(), jwt_decode(tokenSubject.value) as TokenData) : null
const isLoggedIn = () => getTokenData()?.iat != null

const AuthenticationService = {
    register,
    login,
    logout,
    isLoggedIn,
    //: tokenSubject.asObservable(),
    get token() {
        return tokenSubject.value
    },
    get user() {
        return getTokenData() as User
    },
    get tokenExpirationDate() {
        return getTokenData()?.expirationDate
    }
}

export default AuthenticationService

export type Role = 'ADMIN' | 'MODERATOR' | 'MANAGER' | 'USER' | 'BLOCKED'

export class User implements IUser {
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

async function register(username: string, password: string, email: string, firstName: string, lastName: string) {
    let input = new RegisterInput({ username, passwordHash: sha512.base64(password), firstName, lastName })
    await api.register(input)
}

async function login(username: string, password: string) {
    let input = new LogonInput({ username, passwordHash: sha512.base64(password) })
    let token = await api.authenticate(input)

    localStorage.setItem(tokenLocalStorageKey, token)
    tokenSubject.next(token)
}

async function logout() {
    localStorage.removeItem(tokenLocalStorageKey)
    tokenSubject.next(null!);
}