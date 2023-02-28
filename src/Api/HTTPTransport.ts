
enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

enum HResponseType {
    default = '',
    text = 'text',
    arraybuffer = 'arraybuffer',
    blob = 'blob',
    document = 'document',
    json = 'json',
}

interface Options {
    data?: any
    headers?: Record<string, string>
    withCredentials?: boolean
    timeout?: number
    responseType?: ResponseType
}

export default class HTTPTransport {

    isObject(value: any) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    queryStringify(data: any): string {
        if (!this.isObject(data)) {
            throw new Error('Data must be an object')
        }

        const keys = Object.keys(data)
        return keys.reduce((result, key, index) => {
            const value = data[key]
            const end = index < keys.length - 1 ? '&' : ''
            return `${ result }${ key }=${ value }${ end }`;
        }, '?')
    }

    private readonly _baseUrl: string

    constructor(url: string) {
        this._baseUrl = url
    }

    async get<T>(url: string, options: Options = {} as Options): Promise<T> {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.GET,
            },
            options.timeout,
        )
    }

    async post<T>(url: string, options: Options = {} as Options): Promise<T> {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.POST,
            },
            options.timeout,
        )
    }

    async put<T>(url: string, options: Options = {} as Options): Promise<T> {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.PUT,
            },
            options.timeout,
        )
    }

    async patch<T>(url: string, options: Options = {} as Options): Promise<T> {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.PATCH,
            },
            options.timeout,
        )
    }

    async delete<T>(url: string, options: Options = {} as Options): Promise<T> {
        return this.request(
            url,
            {
                ...options,
                method: METHOD.DELETE,
            },
            options.timeout,
        )
    }

    async request<T>(
        url: string,
        options: Options & { method: typeof METHOD[keyof typeof METHOD] },
        timeout = 5000,
    ): Promise<T> {
        const {
            data,
            method,
            headers = {},
            withCredentials,
            responseType = HResponseType.default,
        } = options

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method')
                return
            }

            const isGet = method === METHOD.GET

            const transformedUrl = isGet
                ? `${this._baseUrl}${url}${this.queryStringify(data)}` 
                : `${ this._baseUrl }${ url }`;

            const xhr = new XMLHttpRequest()
            xhr.open(method, transformedUrl)

            xhr.responseType = responseType as HResponseType

            Object.values(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            if (withCredentials) {
                xhr.withCredentials = true
            }

            xhr.onload = () => {
                resolve(xhr.response)
            }

            xhr.onerror = () => {
                reject(new Error(`An error occurred while sending: ${xhr.status}`))
            }

            xhr.ontimeout = () => {
                reject(new Error(`The timeout ${timeout} is out`))
            }

            xhr.timeout = timeout

            if (isGet && !data) {
                xhr.send()
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
} 
