import circle from '../assets/about-circle.png'
import portrait from '../assets/about-portrait.webp'

export default function AboutPortrait() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-9.5 right-0 hidden lg:block w-[36.4vw] max-w-131"
    >
      <img src={circle} alt="" className="w-full h-auto" />
      <img
        src={portrait}
        alt=""
        className="absolute inset-0 w-full h-auto"
      />
    </div>
  )
}
