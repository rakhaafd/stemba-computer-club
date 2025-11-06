import { useState, useRef, useEffect } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { 
  Form, 
  FormField, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@components/ui/form"

interface PresensiData {
  nama: string
  kelas: string
  email: string
  kode: string
  subject: string
}

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder 
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
        className={`w-full text-left bg-[#161616] border border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#99a1af] focus:ring-opacity-20 transition-colors duration-200 flex items-center justify-between ${
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
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#161616] border border-[#2a2a2a] rounded-md shadow-lg overflow-hidden">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-3 py-3 text-base transition-colors duration-150 ${
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

const PresensiForm = () => {
  const { data, setData, post, processing, reset, errors } = useForm({
    nama: "",
    kelas: "",
    email: "",
    kode: "",
    subject: ""
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const subjects = [
    "UI/UX Design",
    "Cyber Security", 
    "Web Programming"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simpan data atau kirim ke API
    console.log("Data presensi:", formData)
    setIsSubmitted(true)
    
    // Reset form setelah 2 detik
    setTimeout(() => {
      setFormData({
        nama: "",
        kelas: "",
        email: "",
        kode: "",
        subject: ""
      })
      setIsSubmitted(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl mx-auto bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader className="text-center pb-8 px-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CardTitle className="font-primary text-[#EFEEEA] text-4xl">Attendance Form</CardTitle>
          </div>
          <CardDescription className="text-[#99a1af] text-lg">
            Fill out the following form to register for Stemba Computer Club attendance.
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
              <h3 className="text-2xl font-bold text-[#EFEEEA] mb-3 font-primary">
                Attendance Success!
              </h3>
              <p className="text-[#99a1af] text-lg">
                Thank You <span className="text-[#EFEEEA] font-semibold">{formData.nama}</span> for submitting.
              </p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField>
                  <FormLabel className="text-base">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      name="nama"
                      value={data.nama}
                      onChange={handleChange}
                      placeholder="Insert your full name"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base mt-2"
                      required
                    />
                  </FormControl>
                </FormField>

                <FormField>
                  <FormLabel className="text-base">Class</FormLabel>
                  <FormControl>
                    <Input
                      name="kelas"
                      value={data.kelas}
                      onChange={handleChange}
                      placeholder="Ex: X SIJA 1, XI SIJA 2"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base mt-2 "
                      required
                    />
                  </FormControl>
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FormField>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base mt-2"
                      required
                    />
                  </FormControl>
                </FormField>

                <FormField>
                  <FormLabel className="text-base">Attendance Code</FormLabel>
                  <FormControl>
                    <Input
                      name="kode"
                      value={data.kode}
                      onChange={handleChange}
                      placeholder="Insert the code provided"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base mt-2"
                      required
                    />
                  </FormControl>
                </FormField>
              </div>

              {/* Subject Dropdown */}
              <FormField>
                <FormLabel className="text-base">Today's Subject</FormLabel>
                <FormControl className="mt-2">
                  <CustomSelect
                    value={formData.subject}
                    onChange={handleSubjectChange}
                    options={subjects}
                    placeholder="Select a subject"
                  />
                </FormControl>
                <FormDescription className="text-[#99a1af] mt-2">
                  Choose the subject of today's class
                </FormDescription>
              </FormField>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg py-3 h-14 text-base font-semibold"
                  disabled={!formData.nama || !formData.kelas || !formData.email || !formData.kode || !formData.subject}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PresensiForm
