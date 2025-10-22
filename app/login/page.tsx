'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')

    // Validation
    if (!email.includes('@') || !email.includes('.')) {
      setMsg('❌ กรุณากรอก Email ให้ถูกต้อง')
      return
    }

    if (password.length < 1) {
      setMsg('❌ กรุณากรอก Password')
      return
    }

    setLoading(true)

    try {
      const payload = { email, password }

      console.log('👉 Request URL:', '/api/v1/login')
      console.log('👉 Request Headers:', { 'Content-Type': 'application/json' })
      console.log('👉 Request Body:', payload)

      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      console.log('👉 Response Status:', res.status)
      console.log('👉 Response Data:', data)

      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Login failed')
      }

      // เก็บ token และข้อมูล user
      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
      }
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      setMsg('🎉 เข้าสู่ระบบสำเร็จ! กำลังนำไปหน้าหลัก...')

      // Redirect ไปหน้า Dashboard หลัง 1.5 วินาที
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
    <main className='flex min-h-screen items-center justify-center bg-[#090B0F] text-white'>
      <div className='w-full max-w-md rounded-xl bg-[#0f1115] p-6 shadow-lg'>
        <h1 className='mb-6 text-center text-3xl font-bold'>Login</h1>

        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete='email'
            />
          </div>

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full rounded bg-gray-800 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete='current-password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white'
              disabled={loading}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded bg-blue-600 py-2 font-semibold transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
          </button>
        </form>

        {!!msg && (
          <div
            className={`mt-4 rounded p-3 text-sm ${
              msg.startsWith('🎉')
                ? 'bg-green-900/40 text-green-300'
                : 'bg-red-900/40 text-red-300'
            }`}
          >
            {msg}
          </div>
        )}

        <div className='mt-6 space-y-2 text-center text-sm text-gray-400'>
          <p>
            ยังไม่มีบัญชี?{' '}
            <a href='/register' className='text-blue-400 hover:underline'>
              Register
            </a>
          </p>
          {/* เพิ่มลิงก์ Forgot Password ถ้าต้องการ */}
          {/* <p>
            <a href='/forgot-password' className='text-blue-400 hover:underline'>
              ลืมรหัสผ่าน?
            </a>
          </p> */}
        </div>
      </div>
    </main>
  )
}
