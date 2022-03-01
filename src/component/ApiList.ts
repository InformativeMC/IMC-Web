export interface Api {
    name: string,
    url: string,
    requiredResponseField: Array<string>,
}

const ApiList: Array<Api> = [
    {
        name: 'heartbeat',
        url: '/api/system-info/heartbeat',
        requiredResponseField: ["status"],
    },
    {
        name: 'jvm-info',
        url: '/api/system-info/jvm-info',
        requiredResponseField: ['javaVersion', 'jvmInfo', 'jvmName', 'jvmVendor', 'jvmVersion', 'kotlinVersion'],
    },
    {
        name: 'os-info',
        url: '/api/system-info/os-info',
        requiredResponseField: ["allocatedMemory", "freeMemory", "maxMemory", "osName"],
    },
]

export default ApiList