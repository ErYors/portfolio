export default function PageFallback() {
  return (
    <div
      role="status"
      aria-label="Chargement de la page…"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-yellow" />
    </div>
  )
}
