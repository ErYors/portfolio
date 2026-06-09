import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import ScrollToAnchor from './ScrollToAnchor'

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-page">
      <ScrollToAnchor />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
