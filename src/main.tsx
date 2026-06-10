import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import ErrorBoundary from '@/components/ErrorBoundary'
import { AuthProvider } from '@/context/AuthProvider'
import { ContactsProvider } from '@/context/ContactsProvider'
import { ProjectsProvider } from '@/context/ProjectsProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import { ToastProvider } from '@/context/ToastProvider'
import App from '@/App'
import '@/index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root introuvable')

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <ProjectsProvider>
              <ContactsProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ContactsProvider>
            </ProjectsProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
