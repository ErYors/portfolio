import Button from './components/Button'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

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
