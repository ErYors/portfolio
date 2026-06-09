import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageFallback from '@/components/PageFallback'
import ScrollToAnchor from '@/components/ScrollToAnchor'

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-page">
      <ScrollToAnchor />
      <Header />

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
