import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
