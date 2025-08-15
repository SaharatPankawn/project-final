import Navbar from '@/components/navbar'
import { FaSearch, FaReact, FaChevronRight } from 'react-icons/fa'

export default function NewProjectPage() {
  return (
    <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
      <Navbar />

      <main className='flex-1'>
        <div className='mx-auto w-full max-w-[720px] px-4 pt-16'>
          <h1 className='mb-6 text-3xl font-semibold'>
            Let's build something new.
          </h1>

          <section className='rounded-2xl border border-[#1a2128] bg-[#090C10] p-5 shadow-lg'>
            <h2 className='mb-3 text-base font-semibold'>
              Import Git Repository
            </h2>

            <div className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[240px_1fr]'>
              <div className='relative'>
                <select
                  className='h-10 w-full appearance-none rounded-lg border border-[#1a2128]
                             bg-[#0b1014] px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-blue-600'
                  defaultValue=''
                >
                  <option value='' disabled>
                    Select a Git Namespace
                  </option>
                  <option>my-github-account</option>
                  <option>my-organization</option>
                </select>
                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                  ▾
                </span>
              </div>

              <div className='relative'>
                <FaSearch className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search...'
                  className='h-10 w-full rounded-lg border border-[#1a2128]
                             bg-[#0b1014] pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-600'
                />
              </div>
            </div>

            <div className='rounded-xl border border-[#1a2128] p-2'>
              <div className='flex items-center justify-between rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 py-2.5'>
                <div className='flex items-center gap-3'>
                  <FaReact className='h-5 w-5 text-cyan-400' />
                  <span className='text-sm'>React</span>
                </div>
                <button className='whitespace-nowrap rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700'>
                  Import
                </button>
              </div>

              <div className='mt-2 h-24 rounded-lg bg-transparent' />
            </div>

            <button
              type='button'
              className='mt-4 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white'
            >
              Import Third-Party Git Repository{' '}
              <FaChevronRight className='h-3 w-3' />
            </button>
          </section>
        </div>
      </main>
    </div>
  )
}
