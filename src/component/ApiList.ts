export interface Api {
    name: string,
    url: string,
    method: string,
    requiredResponseField: Array<string>,
}

const ApiList: Array<Api> = [
    {
        name: 'heartbeat',
        url: '/api/system-info/heartbeat',
        method: 'GET',
        requiredResponseField: ["status"],
    },
    {
        name: 'jvm-info',
        url: '/api/system-info/jvm-info',
        method: 'GET',
        requiredResponseField: ['javaVersion', 'jvmInfo', 'jvmName', 'jvmVendor', 'jvmVersion', 'kotlinVersion'],
    },
    {
        name: 'os-info',
        url: '/api/system-info/os-info',
        method: 'GET',
        requiredResponseField: ["allocatedMemory", "freeMemory", "maxMemory", "osName"],
    },
]

export default ApiList