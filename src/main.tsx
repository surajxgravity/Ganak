import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GanakApp from './GanakApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GanakApp />
  </StrictMode>,
)
