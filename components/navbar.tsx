'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaUser, FaSignOutAlt, FaCog, FaChevronDown } from 'react-icons/fa'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // ตรวจสอบ login
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setIsLoggedIn(true)
      try {
        const user = JSON.parse(userData)
        setUsername(
          user.user || user.username || user.email?.split('@')[0] || 'User',
        )
      } catch (err) {
        console.error('Error parsing user:', err)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [pathname])

  const handleLogout = () => {
    if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      setIsLoggedIn(false)
      setUsername('')
      router.push('/login')
    }
  }

  return (
    <header className='fixed top-0 z-50 w-full border-b border-[#1a2128] bg-[#090C10] shadow-lg'>
      <div className='flex items-center justify-between px-8 py-4'>
        <Link href={isLoggedIn ? '/dashboard' : '/'}>
          <h1 className='cursor-pointer text-xl font-semibold transition hover:text-blue-400'>
            🚀 Project Log
          </h1>
        </Link>

        {isLoggedIn && (
          <nav className='hidden items-center gap-6 md:flex'>
            <Link
              href='/dashboard'
              className={`transition hover:text-blue-400 ${
                pathname === '/dashboard' ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              href='/projects'
              className={`transition hover:text-blue-400 ${
                pathname?.startsWith('/projects')
                  ? 'text-blue-400'
                  : 'text-gray-300'
              }`}
            >
              📁 Projects
            </Link>
            <Link
              href='/databases'
              className={`transition hover:text-blue-400 ${
                pathname?.startsWith('/databases')
                  ? 'text-blue-400'
                  : 'text-gray-300'
              }`}
            >
              🗄️ Databases
            </Link>
          </nav>
        )}

        {/* Right Side */}
        <div className='flex items-center gap-4'>
          {isLoggedIn ? (
            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center gap-2 rounded-lg border border-[#1a2128] bg-[#0b1014] px-4 py-2 transition hover:bg-[#131a20]'
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold'>
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className='hidden sm:block'>{username}</span>
                <FaChevronDown className='h-3 w-3 text-gray-400' />
              </button>

              {showDropdown && (
                <div className='absolute right-0 mt-2 w-48 rounded-lg border border-[#1a2128] bg-[#0b1014] shadow-xl'>
                  <div className='border-b border-[#1a2128] px-4 py-3'>
                    <p className='font-semibold'>{username}</p>
                    <p className='text-xs text-gray-400'>
                      {JSON.parse(localStorage.getItem('user') || '{}').email ||
                        ''}
                    </p>
                  </div>

                  <div className='py-2'>
                    <Link
                      href='/profile'
                      onClick={() => setShowDropdown(false)}
                      className='flex items-center gap-3 px-4 py-2 text-sm transition hover:bg-[#131a20]'
                    >
                      <FaUser className='h-4 w-4 text-gray-400' />
                      Profile
                    </Link>
                    <Link
                      href='/settings'
                      onClick={() => setShowDropdown(false)}
                      className='flex items-center gap-3 px-4 py-2 text-sm transition hover:bg-[#131a20]'
                    >
                      <FaCog className='h-4 w-4 text-gray-400' />
                      Settings
                    </Link>
                  </div>

                  <div className='border-t border-[#1a2128] py-2'>
                    <button
                      onClick={() => {
                        setShowDropdown(false)
                        handleLogout()
                      }}
                      className='flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-400 transition hover:bg-[#131a20]'
                    >
                      <FaSignOutAlt className='h-4 w-4' />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login/Sign Up Buttons (ก่อน login)
            <div className='flex gap-3'>
              <Link href='/login'>
                <button className='rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white'>
                  Login
                </button>
              </Link>
              <Link href='/register'>
                <button className='rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700'>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  )
}
