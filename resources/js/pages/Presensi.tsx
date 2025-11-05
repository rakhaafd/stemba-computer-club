import { useState, useEffect } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import PresensiForm from "@fragments/PresensiForm"
import Footer from "@/components/Footer"

const Presensi = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToForm = () => {
    const element = document.getElementById('presensi-form')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#161616] text-[#EFEEEA]">
      {/* Hero Section */}
      <section className="py-2 px-6 pt-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-primary tracking-tight">
            Attendance <span className="text-[#99a1af]">SCC</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#99a1af] mb-8 leading-relaxed max-w-3xl mx-auto">
            Take attendance for Stemba Computer Club activities easily and quickly.
          </p>

          <Button 
            onClick={scrollToForm}
            className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg px-8"
          >
            Fill out now!
          </Button>
        </div>
      </section>

      {/* Form Section - FULL SCREEN */}
      <section id="presensi-form">
        <PresensiForm />  {/* ← LANGSUNG RENDER TANPA CONTAINER */}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Presensi