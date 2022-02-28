export interface Api {
    name: string,
    url: string,
    requiredResponse: Map<string, any>,
    optionalResponse: Map<string, any>,
}

const ApiList: Array<Api> = [
    {
        name: 'heartbeat',
        url: '/api/system-info/heartbeat',
        requiredResponse: new Map<string, any>([["status", "healthy"]]),
        optionalResponse: new Map(),
    },
    {
        name: 'jvm-info',
        url: '/api/system-info/jvm-info',
        requiredResponse: new Map<string, any>(),
        optionalResponse: new Map(),
    },
    {
        name: 'os-info',
        url: '/api/system-info/os-info',
        requiredResponse: new Map<string, any>(),
        optionalResponse: new Map(),
    },
]

export default ApiList