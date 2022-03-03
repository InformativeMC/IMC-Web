import AppBar from './component/ImcAppBar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import GeneralInfo from './routes/GeneralInfo'
import DevTool from './routes/DevTool'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/' element={<GeneralInfo />} />
          <Route path='/general-info' element={<GeneralInfo />} />
          <Route path='/dev-tool' element={<DevTool />} />
        </Routes>
        <Outlet />
      </BrowserRouter>
    </div>
  )
}

export default App
