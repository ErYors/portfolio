import AboutMe from '../components/AboutMe'
import AboutPortrait from '../components/AboutPortrait'

export default function About() {
  return (
    <div className="relative max-w-300 mx-auto px-6 xl:px-0">
      <AboutPortrait />
      <AboutMe />
    </div>
  )
}
