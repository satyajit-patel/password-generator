import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ShootingStarsAndStarsBackgroundDemo} from './components/shootingStarBackground/ShootingStarsAndStarsBackgroundDemo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
