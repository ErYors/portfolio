import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
