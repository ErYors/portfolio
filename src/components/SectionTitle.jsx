export default function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold text-ink">
        {children}
      </h2>
      <div className="mt-3 mx-auto h-1 w-25 rounded-full bg-yellow" />
    </div>
  )
}
