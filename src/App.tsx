import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/layouts/Layout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageFallback from '@/components/PageFallback'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Login = lazy(() => import('@/pages/Login'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const AdminContacts = lazy(() => import('@/pages/AdminContacts'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<Dashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
