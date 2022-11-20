import { IAuthenticationClient, AuthenticationClient, IUser, LogonInput, LogonOutput, RegisterInput, RegisterOutput } from '../api/ApiClient'
import { BehaviorSubject } from 'rxjs'
import { sha512 } from 'sha512-crypt-ts';

const userLocalStorageKey = 'user';
const userSubject = new BehaviorSubject<LogonOutput>(JSON.parse(localStorage.getItem(userLocalStorageKey)!))
const api: IAuthenticationClient = new AuthenticationClient()
const hash = (password: string) => sha512.crypt(password, '$6$rounds=1000$saltValue')
const isLoggedIn = () => userSubject.value ? true : false

const AuthenticationService = {
    register,
    login,
    logout,
    isLoggedIn,
    get user() { return <User><IUser>userSubject.value.user }
}

export default AuthenticationService

export type Role = 'ADMIN' | 'MODERATOR' | 'MANAGER' | 'USER'

export class User implements IUser {
    id!: number
    login!: string | undefined
    role!: Role
    permissions!: string[]
    firstName: string | undefined
    lastName: string | undefined
    hasPermission(permission: string): boolean {
        return this.permissions.includes(permission)
    }
    hasAnyPermission(permissions: string[]): boolean {
        let hasAnyPermission = false
        permissions.forEach(permission => {
            if (this.permissions.includes(permission)) {
                hasAnyPermission = true
                return
            }
        });
        return hasAnyPermission
    }
    hasAllPermissions(permissions: string[]): boolean {
        return permissions.every(permission => this.permissions.includes(permission))
    }
}

async function register(username: string, password: string, roleId: number, firstName: string, lastName: string) {
    let input = new RegisterInput({ username, passwordHash: hash(password), roleId, firstName, lastName })
    await api.register(input)
    await login(username, password)
}

async function login(username: string, password: string) {
    let input = new LogonInput({ username, passwordHash: hash(password) })
    let response = await api.authenticate(input)

    localStorage.setItem(userLocalStorageKey, JSON.stringify(response.user))
    userSubject.next(response.user!)
}

async function logout() {
    localStorage.removeItem(userLocalStorageKey)
    userSubject.next(null!);
}

export const AuthHeader = () => {
    return { Authorization: `Bearer ${userSubject.value.tokenData?.token}` }
}