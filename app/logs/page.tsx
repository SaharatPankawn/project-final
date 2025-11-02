'use client'
import React from 'react'
import {
  FaFilter,
  FaUser,
  FaBolt,
  FaSearch,
  FaSync,
  FaPlay,
} from 'react-icons/fa'
import Navbar from '../../components/navbar'

export default function ProjectLogPage() {
  return (
    <div className='min-h-screen bg-[#090B0F] text-white'>
      <Navbar />

      <div className='flex items-center gap-2 border-b border-gray-800 px-6 py-4 pt-24'>
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaFilter className='text-white' />
        </button>
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaUser className='text-white' />
        </button>
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaBolt className='text-white' />
        </button>

        <div className='flex h-10 flex-1 items-center rounded bg-[#1a1d21] px-3'>
          <FaSearch className='mr-2 text-gray-400' />
          <input
            type='text'
            placeholder='1 total logs found...'
            className='flex-1 bg-transparent text-sm text-white outline-none'
          />
        </div>

        <button className='flex h-10 items-center gap-2 rounded bg-[#1a1d21] px-4 text-white hover:bg-[#25292d]'>
          <FaPlay className='text-white' />
          Live
        </button>

        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaSync className='text-white' />
        </button>
      </div>

      <div className='px-6 py-4'>
        <table className='w-full text-sm'>
          <thead className='border-b border-gray-800'>
            <tr className='text-gray-400'>
              <th className='py-2 text-left'>Time</th>
              <th className='py-2 text-left'>Status</th>
              <th className='py-2 text-left'>Host</th>
              <th className='py-2 text-left'>Request</th>
              <th className='py-2 text-left'>Messages</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-gray-800'>
              <td className='py-2'>JUN 10 10:50:30</td>
              <td className='text-green-500'>GET 200</td>
              <td>Sanya-Pluem-Project</td>
              <td>/favicon.ico</td>
              <td className='text-gray-500'></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
