import jwt_decode from 'jwt-decode'
import { Role } from '../stores/AuthenticationStore'

export enum TokenType {
    Access = 'ACCESS_TOKEN',
    Refresh = 'REFRESH_TOKEN'
}

export type TokenData = {
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

export type Token = {
    key: string
    issueDate: Date
    expirationDate: Date
}

class TokenManager {
    static getKey(tokenType: TokenType) {
        return localStorage.getItem(tokenType)
    }

    private static setKey (tokenType: TokenType, value: string | null | undefined) {
        if (value) {
            localStorage.setItem(tokenType, value)
        } else {
            localStorage.removeItem(tokenType)
        }
    }

    static setKeys (accessToken: string | null | undefined, refreshToken: string | null | undefined) {
        TokenManager.setKey(TokenType.Access, accessToken)
        TokenManager.setKey(TokenType.Refresh, refreshToken)
    }

    static decodeKey = (tokenKey: string | null): TokenData | null => {
        if (tokenKey)
            return jwt_decode(tokenKey) as TokenData
        return null
    }

    static getToken = (): Token | null => {
        let tokenKey = this.getKey(TokenType.Access)
        if (!tokenKey)
            return null

        let tokenRawData = this.decodeKey(tokenKey)
        if (!tokenRawData)
            return null

        return {
            key: tokenKey,
            issueDate: new Date(tokenRawData.iat * 1000),
            expirationDate: new Date(tokenRawData.exp * 1000)
        }
    }
}

export default TokenManager