import { IUser, LogonOutput, ILogonOutput, User as ApiUser, TokenData } from '../api/ApiClient'
import { BehaviorSubject } from 'rxjs'

const userLocalStorageKey = 'user';
const userSubject = new BehaviorSubject<LogonOutput>(JSON.parse(localStorage.getItem(userLocalStorageKey)!))
const isLoggedIn = () => userSubject.value ? true : false

const AuthenticationService = {
    login,
    logout,
    isLoggedIn,
    logonData: userSubject.asObservable(),
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

async function login() {
    let x: ILogonOutput = {
        user: new ApiUser({
            id: 42,
            firstName: 'Tomaszko',
            lastName: 'Drefko',
            login: 'Krzaczysław',
            role: 'ADMIN',
            permissions: ['MASTER', 'OF', 'DISASTER']
        }),
        tokenData: new TokenData({
            token: 'raz-dwa-trzy',
            tokenExpiration: new Date(new Date().getMilliseconds() + 1000 * 60 * 60 * 1)
        })
    }
    localStorage.setItem(userLocalStorageKey, JSON.stringify(x.user))
    userSubject.next(new LogonOutput(x))
}

async function logout() {
    localStorage.removeItem(userLocalStorageKey)
    userSubject.next(null!);
}

export const AuthHeader = () => {
    return { Authorization: `Bearer ${userSubject.value.tokenData?.token}` }
}