import { useState } from "react"
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
}

const PresensiForm = () => {
  const [formData, setFormData] = useState<PresensiData>({
    nama: "",
    kelas: "",
    email: "",
    kode: ""
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        kode: ""
      })
      setIsSubmitted(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader className="text-center pb-8 px-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#EFEEEA] rounded-full flex items-center justify-center">
              <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
            </div>
            <CardTitle className="font-primary text-[#EFEEEA] text-3xl">Presensi</CardTitle>
          </div>
          <CardDescription className="text-[#99a1af] text-lg">
            Isi form berikut untuk melakukan presensi Stemba Computer Club
          </CardDescription>
          <Badge variant="secondary" className="mt-4 bg-[#EFEEEA] text-[#161616] text-base py-1.5 px-4">
            📝 Form Kehadiran
          </Badge>
        </CardHeader>
        
        <CardContent className="pb-8 px-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#EFEEEA] mb-3 font-primary">
                Presensi Berhasil!
              </h3>
              <p className="text-[#99a1af] text-lg">
                Terima kasih <span className="text-[#EFEEEA] font-semibold">{formData.nama}</span> sudah melakukan presensi.
              </p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField>
                  <FormLabel className="text-base">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Nama lengkap sesuai dengan identitas
                  </FormDescription>
                </FormField>

                <FormField>
                  <FormLabel className="text-base">Kelas</FormLabel>
                  <FormControl>
                    <Input
                      name="kelas"
                      value={formData.kelas}
                      onChange={handleChange}
                      placeholder="Contoh: X IPA 1, XI IPS 2"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Kelas dan jurusan saat ini
                  </FormDescription>
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FormField>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base"
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Email aktif untuk konfirmasi
                  </FormDescription>
                </FormField>

                <FormField>
                  <FormLabel className="text-base">Kode Presensi</FormLabel>
                  <FormControl>
                    <Input
                      name="kode"
                      value={formData.kode}
                      onChange={handleChange}
                      placeholder="Masukkan kode yang diberikan"
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] focus:border-[#99a1af] h-12 text-base font-mono"
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Kode unik yang diberikan oleh mentor
                  </FormDescription>
                </FormField>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg py-3 h-14 text-base font-semibold"
                  disabled={!formData.nama || !formData.kelas || !formData.email || !formData.kode}
                >
                  Submit Presensi
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