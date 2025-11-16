"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface PresensiData {
  nama: string
  kelas: string
  email: string
  kode: string
  subject: string
  error: string
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-[#161616] border border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#99a1af] flex items-center justify-between ${
          !value ? "text-[#99a1af]" : ""
        }`}
      >
        <span>{value || placeholder}</span>
        <svg
          className={`w-5 h-5 text-[#99a1af] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#161616] border border-[#2a2a2a] rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-3 py-3 text-base ${
                  value === option
                    ? "bg-[#2a2a2a] text-[#EFEEEA]"
                    : "text-[#99a1af] hover:bg-[#1f1f1f] hover:text-[#EFEEEA]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PresensiForm({subjects}) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  // const subjects = ["UI/UX Design", "Cyber Security", "Web Programming"]

  // ✅ Inertia form setup
  const { data, setData, post, processing, errors, reset } = useForm<PresensiData>({
    nama: "",
    kelas: "",
    email: "",
    kode: "",
    subject: "",
    error: ""
  })
  

  // ✅ Handle form submission (like Auth)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post("/user/presensi", {
      onSuccess: () => {
        setIsSubmitted(true)
        setTimeout(() => {
          reset()
          setIsSubmitted(false)
        }, 2500)
      },
      onError: () => {
        console.log("AAAAAAAAAAAAAAAAAAA")
        console.log(errors)
        alert("Failed to submit attendance form.")
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl mx-auto bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader className="text-center pb-8 px-8 pt-8">
          <CardTitle className="font-primary text-[#EFEEEA] text-4xl">Attendance Form</CardTitle>
          <CardDescription className="text-[#99a1af] text-lg">
            Fill out the form to register your presence.
          </CardDescription>
          <Badge variant="secondary" className="mt-4 bg-[#EFEEEA] text-[#161616] text-base py-1.5 px-4">
            Attendance Date: XX/XX/20XX
          </Badge>
        </CardHeader>

        <CardContent className="pb-8 px-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#EFEEEA] mb-3 font-primary">Attendance Success!</h3>
              <p className="text-[#99a1af] text-lg">Thank you for submitting your attendance.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-300">
              {/* Full Name + Class */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-base text-[#EFEEEA]">
                    Full Name
                  </Label>
                  <Input
                    id="nama"
                    value={data.nama}
                    onChange={(e) => setData("nama", e.target.value)}
                    placeholder="Insert your full name"
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                  />
                  {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kelas" className="text-base text-[#EFEEEA]">
                    Class
                  </Label>
                  <Input
                    id="kelas"
                    value={data.kelas}
                    onChange={(e) => setData("kelas", e.target.value)}
                    placeholder="Ex: X SIJA 1"
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                  />
                  {errors.kelas && <p className="text-red-500 text-sm">{errors.kelas}</p>}
                </div>
              </div>

              {/* Email + Code */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base text-[#EFEEEA]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="email@example.com"
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kode" className="text-base text-[#EFEEEA]">
                    Attendance Code
                  </Label>
                  <Input
                    id="kode"
                    value={data.kode}
                    onChange={(e) => setData("kode", e.target.value)}
                    placeholder="Insert the code provided"
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                  />
                  {errors.kode && <p className="text-red-500 text-sm">{errors.kode}</p>}
                </div>
              </div>

              {/* Custom Subject Dropdown */}
              <div className="space-y-2">
                <Label className="text-base text-[#EFEEEA]">Today's Subject</Label>
                <CustomSelect
                  value={data.subject}
                  onChange={(val) => setData("subject", val)}
                  options={subjects}
                  placeholder="Select a subject"
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg py-3 h-14 text-base font-semibold"
                >
                  {processing ? "Submitting..." : "Submit Attendance"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}