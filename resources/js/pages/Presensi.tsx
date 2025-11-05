import { useState, useEffect } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import PresensiForm from "@fragments/PresensiForm"

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
      <section className="py-16 px-6 pt-20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Badge variant="secondary" className="mb-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
            📋 Sistem Presensi
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-primary tracking-tight">
            Presensi <span className="text-[#99a1af]">SCC</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#99a1af] mb-8 leading-relaxed max-w-3xl mx-auto">
            Lakukan presensi kehadiran untuk kegiatan Stemba Computer Club dengan mudah dan cepat.
          </p>

          <Button 
            onClick={scrollToForm}
            className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg px-8"
          >
            Isi Presensi Sekarang
          </Button>
        </div>
      </section>

      {/* Form Section - FULL SCREEN */}
      <section id="presensi-form">
        <PresensiForm />  {/* ← LANGSUNG RENDER TANPA CONTAINER */}
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#EFEEEA] rounded-full flex items-center justify-center">
              <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
            </div>
            <span className="text-xl font-bold font-primary">Stemba Computer Club</span>
          </div>
          <p className="text-[#99a1af] max-w-md mx-auto">
            Sistem presensi digital untuk kegiatan Stemba Computer Club
          </p>
          <div className="border-t border-[#2a2a2a] mt-8 pt-8 text-center text-[#99a1af]">
            <p>&copy; 2024 Stemba Computer Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Presensi