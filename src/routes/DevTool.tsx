import { useState } from 'react'
import ServerInfo from '../common/ServerInfo'
import ApiChecker from '../component/ApiChecker'

function DevTool(props: ServerInfo) {

  const [testAddr, setTestAddr] = useState(props.serverAddr)

  return (
    <ApiChecker serverAddr={testAddr} setServerAddr={setTestAddr} />
  )
}

export default DevTool