import { IAuthenticationClient, AuthenticationClient, IUser, LogonInput, LogonOutput, RegisterInput, RegisterOutput } from '../api/ApiClient'
import { BehaviorSubject } from 'rxjs'
import Hasha from 'hasha'

const userLocalStorageKey = 'user';
const userSubject = new BehaviorSubject<LogonOutput>(JSON.parse(localStorage.getItem(userLocalStorageKey)!))
const api: IAuthenticationClient = new AuthenticationClient()
const hash = (password: string) => Hasha(password, { algorithm: 'sha512' })
const isLoggedIn = () => userSubject.value ? true : false

export const AuthenticationService = {
    register,
    login,
    logout,
    isLoggedIn,
    get user() { return <User><IUser>userSubject.value.user }
}

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
    return { Authorization: `Bearer ${userSubject.value.token}` }
}