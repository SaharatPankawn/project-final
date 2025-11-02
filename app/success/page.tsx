'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { FaRegCopy } from 'react-icons/fa'
import { useState } from 'react'

export default function DeploySuccessPage() {
  const domain = 'sanya-pluem.kmuttb'
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(domain)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  return (
    <div className='min-h-screen bg-[#090C10] text-white'>
      <Navbar />

      <main className='mx-auto w-full max-w-6xl px-6 pt-24'>
        <h1 className='text-[28px] font-semibold'>Congratulations !</h1>
        <p className='mt-1 text-sm text-gray-300'>
          you just deployed a new Project
        </p>

        <div className='mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,720px)_1fr]'>
          <section className='rounded-2xl border border-[#1a2128] bg-[#0b1014] p-5'>
            <div className='overflow-hidden rounded-lg border-4 border-[#0b1014] bg-black/40'>
              <Image
                src='/test.png'
                alt='Deployment Preview'
                width={1200}
                height={800}
                className='h-auto w-full'
                priority
              />
            </div>
          </section>

          <div className='pt-2 lg:pt-10'>
            <Link
              href='/dashboard'
              className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700'
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className='mt-8'>
          <h3 className='mb-2 text-sm font-medium text-gray-300'>Domains</h3>
          <div className='flex items-center gap-2'>
            <span className='text-sm'>{domain}</span>
            <button
              onClick={copy}
              aria-label='Copy domain'
              className='inline-flex h-5 w-5 items-center justify-center rounded border border-[#2a3239] hover:bg-[#131a20]'
              title='Copy'
            >
              <FaRegCopy className='h-3.5 w-3.5' />
            </button>
            {copied && <span className='text-xs text-gray-400'>Copied</span>}
          </div>
        </div>
      </main>
    </div>
  )
}
