import Navbar from '../../components/navbar'
import { FaPlus, FaUserPlus, FaSearch } from 'react-icons/fa'

export default function DashboardPage() {
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
                placeholder='Search...'
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
              className='flex items-center justify-center rounded-lg border border-[#1a2128] bg-[#0b1014]
                         px-3 py-2 transition hover:bg-[#131a20]'
              aria-label='New'
            >
              <FaPlus className='h-4 w-4' />
            </button>
          </div>

          <section
            className='relative w-full rounded-xl border border-[#1a2128]
                       bg-[#0b1014] px-10 py-12 text-center shadow-lg'
          >
            <h2 className='mb-3 text-3xl font-semibold'>No project, yet !!</h2>
            <p className='mx-auto max-w-2xl text-gray-400'>
              Create a project form a Template, or import a Git repository.
            </p>

            <div className='mt-8'>
              <button className='rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700'>
                Create a New Project
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
