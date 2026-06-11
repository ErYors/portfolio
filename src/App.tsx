import { lazy, Suspense } from 'react'
import type { ReactElement } from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import Layout from '@/layouts/Layout'
import {
  AboutSkeleton,
  AdminDashboardSkeleton,
  AdminListSkeleton,
  AdminProjectsSkeleton,
  ContactSkeleton,
  HomeSkeleton,
  LoginSkeleton,
  ProjectDetailSkeleton,
} from '@/components/skeletons'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Login = lazy(() => import('@/pages/Login'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const AdminContacts = lazy(() => import('@/pages/AdminContacts'))
const AdminTestimonials = lazy(() => import('@/pages/AdminTestimonials'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function suspended(node: ReactElement, fallback: ReactElement | null) {
  return <Suspense fallback={fallback}>{node}</Suspense>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={suspended(<Login />, <LoginSkeleton />)} />

      <Route element={<Layout />}>
        <Route index element={suspended(<Home />, <HomeSkeleton />)} />
        <Route path="about" element={suspended(<About />, <AboutSkeleton />)} />
        <Route
          path="contact"
          element={suspended(<Contact />, <ContactSkeleton />)}
        />
        <Route
          path="projects/:id"
          element={suspended(<ProjectDetail />, <ProjectDetailSkeleton />)}
        />
        <Route path="*" element={suspended(<NotFound />, null)} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={suspended(<AdminDashboard />, <AdminDashboardSkeleton />)}
          />
          <Route
            path="projects"
            element={suspended(<Dashboard />, <AdminProjectsSkeleton />)}
          />
          <Route
            path="contacts"
            element={suspended(<AdminContacts />, <AdminListSkeleton />)}
          />
          <Route
            path="testimonials"
            element={suspended(<AdminTestimonials />, <AdminListSkeleton />)}
          />
        </Route>
      </Route>
    </Routes>
  )
}
