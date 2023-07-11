import { v4 as guid } from 'uuid';

export abstract class BaseClient {
    protected getBaseUrl = (defaultUrl: string, baseUrl?: string): string => {
        if (baseUrl != null)
            return baseUrl
        else if (defaultUrl.length > 0)
            return defaultUrl
        else
            return 'http://localhost:5000'
    }

    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        this.addRequestGuid(options)
        return Promise.resolve(options)
    }

    protected transformResult = (url: string, response: Response, processor: (response: Response) => Promise<any>): Promise<any> => { 
        return processor(response);
    }

    protected addRequestGuid = (options: RequestInit) => {
        options.headers = { ...options.headers, RequestId: guid() }
    }
}