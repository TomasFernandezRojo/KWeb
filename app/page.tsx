import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Servicios from '@/components/sections/Servicios'
import Skills from '@/components/sections/Skills'
import ComoTrabajamos from '@/components/sections/ComoTrabajamos'
import Portfolio from '@/components/sections/Portfolio'
import FAQ from '@/components/sections/FAQ'
import CTAFinal from '@/components/sections/CTAFinal'
import MotionFooter from '@/components/ui/motion-footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Servicios />
      <Skills />
      <ComoTrabajamos />
      <Portfolio />
      <FAQ />
      <CTAFinal />
      <MotionFooter />
    </main>
  )
}
