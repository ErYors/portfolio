import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import { ProjectsProvider } from './contexts/ProjectsProvider'
import { ThemeProvider } from './contexts/ThemeProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProjectsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
