interface ServerInfo {
  readonly serverAddr: string
  setServerAddr: (updater: ((oldVal: string) => string) | string) => void
}

export default ServerInfo