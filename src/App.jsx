import Button from './components/Button'

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col gap-8 items-start p-10">
        <h1 className="text-2xl font-semibold text-slate-900">Test du bouton super cool</h1>
        <div className="flex gap-3">
          <Button variant="primary">Projects</Button>
          <Button variant="secondary">LinkedIn</Button>
        </div>
      </div>
    </main>
  )
}

export default App
