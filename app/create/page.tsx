'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'
import { FaArrowLeft, FaFolder, FaSpinner } from 'react-icons/fa'

export default function CreateProjectPage() {
  const router = useRouter()
  const [user, setUser] = useState<string>('')
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')

  // ตรวจสอบ Authentication
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      const username =
        parsedUser.user ||
        parsedUser.username ||
        parsedUser.email?.split('@')[0]
      setUser(username)
    } catch (err) {
      console.error('Error parsing user:', err)
      router.push('/login')
    }
  }, [router])

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')

    // Validation
    if (!projectName.trim()) {
      setMsg('❌ กรุณากรอกชื่อโปรเจค')
      return
    }

    if (projectName.length < 3) {
      setMsg('❌ ชื่อโปรเจคต้องมีอย่างน้อย 3 ตัวอักษร')
      return
    }

    // ตรวจสอบชื่อโปรเจค (อนุญาตเฉพาะ a-z, 0-9, -, _)
    if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
      setMsg('❌ ชื่อโปรเจคสามารถใช้ได้เฉพาะ a-z, 0-9, -, _ เท่านั้น')
      return
    }

    setLoading(true)

    try {
      const payload = {
        user,
        project: projectName,
      }

      console.log('📤 Creating project:', payload)

      const res = await fetch('/api/v1/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      console.log('📥 Response:', { status: res.status, data })

      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'สร้างโปรเจคไม่สำเร็จ')
      }

      setMsg('🎉 สร้างโปรเจคสำเร็จ! กำลังนำไปหน้า Dashboard...')

      // Redirect หลัง 1.5 วินาที
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err: any) {
      console.error('❌ Error:', err)
      setMsg(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
      <Navbar />

      <main className='flex-1 pb-8 pt-24'>
        <div className='mx-auto w-full max-w-2xl px-6'>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className='mb-6 flex items-center gap-2 text-gray-400 transition hover:text-white'
          >
            <FaArrowLeft className='h-4 w-4' />
            <span>กลับ</span>
          </button>

          {/* Header */}
          <div className='mb-8'>
            <div className='mb-3 flex items-center gap-3'>
              <div className='rounded-lg bg-blue-500/10 p-3'>
                <FaFolder className='h-6 w-6 text-blue-500' />
              </div>
              <h1 className='text-3xl font-bold'>Create New Project</h1>
            </div>
            <p className='text-gray-400'>
              สร้างโปรเจคใหม่เพื่อเริ่มต้นการทำงาน
            </p>
          </div>

          {/* Form */}
          <div className='rounded-xl border border-[#1a2128] bg-[#0b1014] p-6 shadow-lg'>
            <form onSubmit={handleCreateProject} className='space-y-6'>
              {/* Project Name */}
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ชื่อโปรเจค <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='my-awesome-project'
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  disabled={loading}
                  required
                  className='w-full rounded-lg border border-[#1a2128] bg-[#090C10] px-4 py-3
                             text-white placeholder-gray-500
                             outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             disabled:cursor-not-allowed disabled:opacity-50'
                />
                <p className='mt-2 text-xs text-gray-500'>
                  ใช้ได้เฉพาะ a-z, 0-9, -, _ (ความยาวอย่างน้อย 3 ตัวอักษร)
                </p>
              </div>

              {/* User Info */}
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  เจ้าของโปรเจค
                </label>
                <input
                  type='text'
                  value={user}
                  disabled
                  className='w-full cursor-not-allowed rounded-lg border border-[#1a2128] bg-[#090C10] px-4
                             py-3 text-gray-400'
                />
              </div>

              {/* Message */}
              {msg && (
                <div
                  className={`rounded-lg p-4 text-sm ${
                    msg.startsWith('🎉')
                      ? 'border border-green-500/20 bg-green-500/10 text-green-400'
                      : 'border border-red-500/20 bg-red-500/10 text-red-400'
                  }`}
                >
                  {msg}
                </div>
              )}

              {/* Buttons */}
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => router.back()}
                  disabled={loading}
                  className='flex-1 rounded-lg border border-[#1a2128] bg-[#0b1014] px-6 py-3
                             font-medium transition hover:bg-[#131a20]
                             disabled:cursor-not-allowed disabled:opacity-50'
                >
                  ยกเลิก
                </button>
                <button
                  type='submit'
                  disabled={loading || !projectName.trim()}
                  className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3
                             font-medium transition hover:bg-blue-700
                             disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {loading ? (
                    <>
                      <FaSpinner className='h-4 w-4 animate-spin' />
                      <span>กำลังสร้าง...</span>
                    </>
                  ) : (
                    <>
                      <FaFolder className='h-4 w-4' />
                      <span>สร้างโปรเจค</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className='mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4'>
            <h3 className='mb-2 font-semibold text-blue-400'>💡 หมายเหตุ</h3>
            <ul className='space-y-1 text-sm text-gray-400'>
              <li>
                • หลังจากสร้างโปรเจคแล้ว คุณสามารถตั้งค่า Config ได้ภายหลัง
              </li>
              <li>• ชื่อโปรเจคไม่สามารถเปลี่ยนแปลงได้หลังจากสร้าง</li>
              <li>• โปรเจคจะถูกสร้างด้วยการตั้งค่าเริ่มต้น</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
