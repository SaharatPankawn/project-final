'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')

    // Validation
    if (!email.includes('@') || !email.includes('.')) {
      setMsg('❌ กรุณากรอก Email ให้ถูกต้อง')
      return
    }

    if (user.length < 3) {
      setMsg('❌ Username ต้องมีอย่างน้อย 3 ตัวอักษร')
      return
    }

    if (password.length < 6) {
      setMsg('❌ Password ต้องมีอย่างน้อย 6 ตัวอักษร')
      return
    }

    setLoading(true)

    try {
      const payload = {
        email,
        user,
        password,
      }

      console.log('👉 Request URL:', '/api/v1/register')
      console.log('👉 Request Headers:', { 'Content-Type': 'application/json' })
      console.log('👉 Request Body:', payload)

      const res = await fetch('/api/v1/register', {
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
        throw new Error(data?.message || data?.error || 'Register failed')
      }

      setMsg('🎉 สมัครสมาชิกสำเร็จ! กำลังนำไปหน้า Login...')

      // Redirect หลัง 2 วินาที
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      console.error('❌ Error:', err)
      setMsg(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // แสดง password strength
  const getPasswordStrength = () => {
    if (password.length === 0) return ''
    if (password.length < 6) return 'อ่อน'
    if (password.length < 10) return 'ปานกลาง'
    return 'แข็งแรง'
  }

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength()
    if (strength === 'อ่อน') return 'text-red-400'
    if (strength === 'ปานกลาง') return 'text-yellow-400'
    if (strength === 'แข็งแรง') return 'text-green-400'
    return ''
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#090B0F] text-white'>
      <div className='w-full max-w-md rounded-xl bg-[#0f1115] p-6 shadow-lg'>
        <h1 className='mb-4 text-center text-2xl font-bold'>Register</h1>

        <form onSubmit={handleRegister} className='space-y-4'>
          <div>
            <input
              type='email'
              placeholder='Email'
              className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Username (อย่างน้อย 3 ตัวอักษร)'
              className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={user}
              onChange={e => setUser(e.target.value)}
              required
              disabled={loading}
              minLength={3}
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password (อย่างน้อย 6 ตัวอักษร)'
              className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
            {password && (
              <p className={`mt-1 text-xs ${getPasswordStrengthColor()}`}>
                ความแข็งแรง: {getPasswordStrength()}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? 'กำลังสมัคร...' : 'Register'}
          </button>
        </form>

        {!!msg && (
          <div
            className={`mt-4 rounded p-2 text-sm ${
              msg.startsWith('🎉')
                ? 'bg-green-900/40 text-green-300'
                : 'bg-red-900/40 text-red-300'
            }`}
          >
            {msg}
          </div>
        )}

        <p className='mt-4 text-center text-sm text-gray-400'>
          มีบัญชีแล้ว?{' '}
          <a href='/login' className='text-blue-400 hover:underline'>
            Login
          </a>
        </p>
      </div>
    </main>
  )
}
