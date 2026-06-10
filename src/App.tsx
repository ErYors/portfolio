import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/layouts/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageFallback from '@/components/PageFallback'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path="admin/projects" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
