import { BaseClient } from './../BaseClient'
import TokenManager, { Token, TokenType } from './../../tools/TokenManager'
import RootStore from './../../stores'

const tokenExpirationThreshold = 60 * 1000 // 1m = 60s * 1000ms

export class ApiBaseClient extends BaseClient {
    constructor() {
        super()
    }

    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        this.addRequestGuid(options)

        const accessToken = TokenManager.getToken()
        if (!accessToken) {
            return Promise.resolve(options)
        }

        const authStore = RootStore.instance.authenticationStore;

        if (accessToken.expirationDate.getTime() - new Date().getTime() < tokenExpirationThreshold) {
            const refreshToken = TokenManager.getKey(TokenType.Refresh)
            if (!refreshToken) {
                return Promise.resolve(options)
            }

            authStore.refreshToken(refreshToken)
        }
        
        options.headers = { ...options.headers, Authorization: `Bearer ${accessToken.key}` }
        if (authStore.user) {
            options.headers = { ...options.headers, UserId: authStore.user.login }
        }

        return Promise.resolve(options)
    }
}