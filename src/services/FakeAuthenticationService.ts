// PRZEROBIĆ NA STORE

import { IUser } from '../api/ApiClient'
import { BehaviorSubject } from 'rxjs'
import jwt_decode from 'jwt-decode'

const tokenLocalStorageKey = 'tokenKey';
const tokenSubject = new BehaviorSubject<string>(localStorage.getItem(tokenLocalStorageKey) ?? '')
const getTokenData = () => {
    if (tokenSubject.value?.length > 0) {
        return Object.assign(new TokenData(), jwt_decode(tokenSubject.value) as TokenData)
    }
    return null
}

const AuthenticationService = {
    login,
    logout,
    isLoggedIn,
    token: tokenSubject.asObservable(),
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

async function login() {
    let token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJsb2dpbiI6IktyemFjemVrIiwibmFtZSI6IktyemFjemVrIiwicm9sZSI6IkFETUlOIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJwZXJtaXNzaW9ucyI6IlRFU1RPV0VfUFJBV08iLCJsYXN0TG9naW5EYXRlIjoiMjAyMi0xMS0yNyAwNDoyMjo1MiIsIm5iZiI6MTY2OTUyMjk3MiwiZXhwIjoxNjY5NTI2NTcyLCJpYXQiOjE2Njk1MjI5NzJ9.XMCdcCOdCqKjagaTdjxPwHov7_fcVwfU_0IDXPtaqGr7MsKNwe0eG-_QLWbNskTvBFv8RNStibQjkWA7rsrqcQ'
    localStorage.setItem(tokenLocalStorageKey, token)
    tokenSubject.next(token)
}

async function logout() {
    localStorage.removeItem(tokenLocalStorageKey)
    tokenSubject.next(null!);
}

function isLoggedIn() {
    return getTokenData()?.iat != null
}

export const AuthHeader = () => {
    return { Authorization: `Bearer ${tokenSubject.value}` }
}