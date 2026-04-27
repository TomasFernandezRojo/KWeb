import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Portfolio from '@/components/sections/Portfolio'
import Servicios from '@/components/sections/Servicios'
import ComoTrabajamos from '@/components/sections/ComoTrabajamos'
import CTAFinal from '@/components/sections/CTAFinal'
import MotionFooter from '@/components/ui/motion-footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Portfolio />
      <Servicios />
      <ComoTrabajamos />
      <CTAFinal />
      <MotionFooter />
    </main>
  )
}
