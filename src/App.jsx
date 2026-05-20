import Button from './components/Button'
import Header from './components/Header'
import yellowBg from './assets/yellow-bg.png'
import heroWoman from './assets/hero-woman.png'

function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 hidden sm:block w-180 max-w-[50%]"
      >
        <img src={yellowBg} alt="" className="w-full h-auto" />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${yellowBg})`,
            maskImage: `url(${yellowBg})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'top right',
            maskPosition: 'top right',
          }}
        >
          <img src={heroWoman} alt="" className="w-full h-auto" />
        </div>
      </div>

      <main className="max-w-300 mx-auto px-6 py-12">
        <div className="flex gap-3">
          <Button variant="primary">Projects</Button>
          <Button variant="secondary">LinkedIn</Button>
        </div>
      </main>
    </div>
  )
}

export default App
