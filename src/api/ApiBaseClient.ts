export class ApiBaseClient {
    constructor() { }
    
    protected getBaseUrl = (defaultUrl: string, baseUrl?: string): string => {
        if (baseUrl != null)
            return baseUrl
        else if (defaultUrl.length > 0)
            return defaultUrl
        else
            return 'http://localhost:5000'
    }

    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        const token = localStorage.getItem('tokenKey')
        options.headers = { ...options.headers, authorization: `Bearer ${token}` }
        return Promise.resolve(options)
    }
}