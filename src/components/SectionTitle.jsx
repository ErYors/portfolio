export default function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-slate-900">
        {children}
      </h2>
      <div className="mt-3 mx-auto h-1 w-25 rounded-full bg-amber-400" />
    </div>
  )
}
