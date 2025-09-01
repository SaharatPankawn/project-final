'use client'
import React, { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    try {
      const payload = {
        email,
        user,
        password,
      }

      console.log(
        '👉 Request URL:',
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      )
      console.log('👉 Request Headers:', { 'Content-Type': 'application/json' })
      console.log('👉 Request Body:', payload)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const data = await res.json().catch(() => ({}))
      console.log('👉 Response Status:', res.status)
      console.log('👉 Response Data:', data)

      if (!res.ok) throw new Error(data?.message || 'Register failed')

      setMsg('🎉 Register success')
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
        <h1 className='mb-4 text-center text-2xl font-bold'>Register</h1>

        <form onSubmit={handleRegister} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type='text'
            placeholder='Username'
            className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none'
            value={user}
            onChange={e => setUser(e.target.value)}
            required
          />

          <input
            type='password'
            placeholder='Password'
            className='w-full rounded bg-gray-800 px-3 py-2 focus:outline-none'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-700 disabled:opacity-60'
          >
            {loading ? 'Registering...' : 'Register'}
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

        <p className='mt-4 text-center text-sm'>
          มีบัญชีแล้ว?{' '}
          <a href='/login' className='text-blue-400 hover:underline'>
            Login
          </a>
        </p>
      </div>
    </main>
  )
}
