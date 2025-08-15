import Navbar from '../../components/navbar'
import { FaGithub, FaGitlab } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
      <Navbar />

      <main className='flex flex-1 items-center justify-center px-4'>
        <div className='w-full max-w-xs space-y-4'>
          <button className='flex w-full items-center justify-center gap-2 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700'>
            <FaGithub className='h-5 w-5' />
            Continue with GitHub
          </button>

          <button className='flex w-full items-center justify-center gap-2 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'>
            <FaGitlab className='h-5 w-5' />
            Continue with GitLab
          </button>

          <p className='cursor-pointer text-center text-sm text-blue-400 hover:underline'>
            Continue with Email →
          </p>
        </div>
      </main>
    </div>
  )
}
