'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'
import {
  FaPlus,
  FaUserPlus,
  FaSearch,
  FaFolder,
  FaDatabase,
  FaUsers,
  FaCog,
  FaTrash,
} from 'react-icons/fa'

interface Project {
  project: string
  user: string
  created_at?: string
}

interface Database {
  db_name: string
  db_type: string
  user: string
  created_at?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<string>('')
  const [projects, setProjects] = useState<Project[]>([])
  const [databases, setDatabases] = useState<Database[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // ตรวจสอบ Authentication
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')

    console.log('🔐 Checking auth:', { token, userData })

    if (!token) {
      console.warn('❌ No token found, redirecting to login')
      router.push('/login')
      return
    }

    if (!userData) {
      console.warn('❌ No user data found, redirecting to login')
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      console.log('👤 Parsed user:', parsedUser)

      const username =
        parsedUser.user ||
        parsedUser.username ||
        parsedUser.email?.split('@')[0]

      if (!username) {
        console.error('❌ Cannot extract username from:', parsedUser)
        router.push('/login')
        return
      }

      console.log('✅ Username set to:', username)
      setUser(username)
    } catch (err) {
      console.error('❌ Error parsing user data:', err)
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const projectRes = await fetch(`/api/v1/project?user=${user}`)
        if (projectRes.ok) {
          const projectData = await projectRes.json()
          setProjects(Array.isArray(projectData) ? projectData : [])
        }

        const dbRes = await fetch(`/api/v1/get/db?user=${user}`)
        if (dbRes.ok) {
          const dbData = await dbRes.json()
          setDatabases(Array.isArray(dbData) ? dbData : [])
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleDeleteProject = async (projectName: string) => {
    if (!confirm(`ต้องการลบโปรเจค "${projectName}" ใช่หรือไม่?`)) return

    try {
      const res = await fetch('/api/v1/project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, project: projectName }),
      })

      if (res.ok) {
        setProjects(projects.filter(p => p.project !== projectName))
        alert('ลบโปรเจคสำเร็จ!')
      } else {
        alert('ลบโปรเจคไม่สำเร็จ')
      }
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('เกิดข้อผิดพลาด')
    }
  }

  // Filter ตาม search
  const filteredProjects = projects.filter(p =>
    p.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
        <Navbar />
        <main className='flex flex-1 items-center justify-center'>
          <div className='text-center'>
            <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            <p className='text-gray-400'>กำลังโหลดข้อมูล...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
      <Navbar />

      <main className='flex-1'>
        <div className='mx-auto mt-20 w-full max-w-6xl px-6'>
          <div className='mb-6 flex items-center gap-4'>
            <div className='relative flex-1'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='ค้นหาโปรเจค...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full rounded-lg border border-[#1a2128] bg-[#0b1014] py-2 pl-10
                           pr-4 text-white placeholder-gray-400
                           outline-none ring-0 focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <button
              className='flex min-w-[170px] items-center gap-2 whitespace-nowrap rounded-lg border
                         border-[#1a2128] bg-[#0b1014] px-4 py-2
                         transition hover:bg-[#131a20]'
            >
              <FaUserPlus className='h-4 w-4' />
              <span className='text-sm'>Add Collaborators</span>
            </button>

            <button
              onClick={() => router.push('/projects/create')}
              className='flex items-center justify-center rounded-lg border border-[#1a2128] bg-[#0b1014]
                         px-3 py-2 transition hover:bg-[#131a20]'
              aria-label='New Project'
            >
              <FaPlus className='h-4 w-4' />
            </button>
          </div>

          <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div className='rounded-xl border border-[#1a2128] bg-[#0b1014] p-6'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-blue-500/10 p-3'>
                  <FaFolder className='h-6 w-6 text-blue-500' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>{projects.length}</p>
                  <p className='text-sm text-gray-400'>Projects</p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-[#1a2128] bg-[#0b1014] p-6'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-green-500/10 p-3'>
                  <FaDatabase className='h-6 w-6 text-green-500' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>{databases.length}</p>
                  <p className='text-sm text-gray-400'>Databases</p>
                </div>
              </div>
            </div>

            <div className='rounded-xl border border-[#1a2128] bg-[#0b1014] p-6'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-purple-500/10 p-3'>
                  <FaUsers className='h-6 w-6 text-purple-500' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>0</p>
                  <p className='text-sm text-gray-400'>Collaborators</p>
                </div>
              </div>
            </div>
          </div>

          <section className='mb-8'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>📁 Recent Projects</h2>
              <button
                onClick={() => router.push('/projects')}
                className='text-sm text-blue-400 hover:underline'
              >
                ดูทั้งหมด →
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className='rounded-xl border border-[#1a2128] bg-[#0b1014] px-10 py-12 text-center'>
                <h3 className='mb-3 text-2xl font-semibold'>
                  No project, yet !!
                </h3>
                <p className='mx-auto mb-6 max-w-2xl text-gray-400'>
                  Create a project from a Template, or import a Git repository.
                </p>
                <button
                  onClick={() => router.push('/projects/create')}
                  className='rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700'
                >
                  Create a New Project
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredProjects.slice(0, 6).map((project, idx) => (
                  <div
                    key={idx}
                    className='group rounded-xl border border-[#1a2128] bg-[#0b1014] p-4 transition hover:border-blue-500/50'
                  >
                    <div className='mb-3 flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='rounded-lg bg-blue-500/10 p-2'>
                          <FaFolder className='h-5 w-5 text-blue-500' />
                        </div>
                        <div>
                          <h3 className='font-semibold'>{project.project}</h3>
                          <p className='text-xs text-gray-400'>
                            by {project.user}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <button
                        onClick={() =>
                          router.push(`/projects/${project.project}/config`)
                        }
                        className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#1a2128] 
                                   bg-[#0b1014] px-3 py-2 text-sm transition hover:bg-[#131a20]'
                      >
                        <FaCog className='h-3 w-3' />
                        Config
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.project)}
                        className='flex items-center justify-center rounded-lg border border-red-500/20 
                                   bg-red-500/10 px-3 py-2 text-red-500 transition hover:bg-red-500/20'
                      >
                        <FaTrash className='h-3 w-3' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {databases.length > 0 && (
            <section>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>🗄️ Recent Databases</h2>
                <button
                  onClick={() => router.push('/databases')}
                  className='text-sm text-blue-400 hover:underline'
                >
                  ดูทั้งหมด →
                </button>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {databases.slice(0, 3).map((db, idx) => (
                  <div
                    key={idx}
                    className='rounded-xl border border-[#1a2128] bg-[#0b1014] p-4'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='rounded-lg bg-green-500/10 p-2'>
                        <FaDatabase className='h-5 w-5 text-green-500' />
                      </div>
                      <div>
                        <h3 className='font-semibold'>{db.db_name}</h3>
                        <p className='text-xs text-gray-400'>{db.db_type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
