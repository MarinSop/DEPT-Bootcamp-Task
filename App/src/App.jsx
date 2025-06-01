import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Routes/Login'
import Home from './Routes/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
