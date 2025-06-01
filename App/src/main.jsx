import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { CityProvider } from './Contexts/CityContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CityProvider>
        <App />
      </CityProvider>
    </AuthProvider>
  </StrictMode>,
)
