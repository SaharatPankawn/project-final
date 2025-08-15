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
      {/* Navbar */}
      <nav className='flex items-center justify-between border-b border-gray-800 bg-[#0f1115] px-6 py-4'>
        <h1 className='text-lg font-semibold'>Project Log</h1>
        <div className='flex gap-2'>
          <button className='rounded bg-blue-600 px-4 py-2 hover:bg-blue-700'>
            Login
          </button>
          <button className='rounded bg-blue-600 px-4 py-2 hover:bg-blue-700'>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Search bar & Controls */}
      <div className='flex items-center gap-2 border-b border-gray-800 px-6 py-4'>
        {/* Icon buttons */}
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaFilter className='text-white' />
        </button>
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaUser className='text-white' />
        </button>
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaBolt className='text-white' />
        </button>

        {/* Search input */}
        <div className='flex h-10 flex-1 items-center rounded bg-[#1a1d21] px-3'>
          <FaSearch className='mr-2 text-gray-400' />
          <input
            type='text'
            placeholder='1 total logs found...'
            className='flex-1 bg-transparent text-sm text-white outline-none'
          />
        </div>

        {/* Live button */}
        <button className='flex h-10 items-center gap-2 rounded bg-[#1a1d21] px-4 text-white hover:bg-[#25292d]'>
          <FaPlay className='text-white' />
          Live
        </button>

        {/* Refresh button */}
        <button className='flex h-10 w-10 items-center justify-center rounded bg-[#1a1d21] hover:bg-[#25292d]'>
          <FaSync className='text-white' />
        </button>
      </div>

      {/* Table */}
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
