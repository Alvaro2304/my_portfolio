import Navigation from "./components/navigation"
import Hero from "./components/hero"
import Gallery from "./components/gallery"
import Portfolio from "./components/portfolio"
import Tools from "./components/tools"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <Gallery />
      <Portfolio />
      <Tools />
      <Contact />
      <Footer />
    </main>
  )
}
