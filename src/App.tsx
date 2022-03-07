import AppBar from './component/ImcAppBar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import GeneralInfo from './routes/GeneralInfo'
import DevTool from './routes/DevTool'
import LogIn from './routes/LogIn'
import { useState } from 'react'

function App() {
  const [serverAddr, setServerAddr] = useState('https://localhost:3030/')
  const [testServerAddr, setTestServerAddr] = useState('https://localhost:3030/')

  const setBothServer = (updater: string | ((oldVal: string) => string)): void => {
    setServerAddr(updater)
    setTestServerAddr(updater)
  }


  return (
    <div className='App'>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path='/'
            element={
              <LogIn serverAddr={serverAddr} setServerAddr={setBothServer} />
            }
          />
          <Route
            path='/login'
            element={
              <LogIn serverAddr={serverAddr} setServerAddr={setBothServer} />
            }
          />
          <Route
            path='/overview'
            element={<GeneralInfo />
            }
          />
          <Route
            path='/dev-tool'
            element={
              <DevTool serverAddr={testServerAddr} setServerAddr={setTestServerAddr} />
            }
          />
        </Routes>
        <Outlet />
      </BrowserRouter>
    </div>
  )
}

export default App
