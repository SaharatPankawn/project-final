'use client'

import Navbar from '@/components/navbar'
import { useEffect, useMemo, useState } from 'react'
import { FaReact, FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa'
import { SiJavascript, SiDeno } from 'react-icons/si'
import { FaNodeJs } from 'react-icons/fa'

type FrameworkKey = 'react' | 'js' | 'deno' | 'node'

const fwMap: Record<FrameworkKey, { label: string; icon: JSX.Element }> = {
  react: {
    label: 'React',
    icon: <FaReact className='h-5 w-5 text-cyan-400' />,
  },
  js: {
    label: 'JS',
    icon: <SiJavascript className='h-5 w-5 text-yellow-400' />,
  },
  deno: { label: 'Deno', icon: <SiDeno className='h-5 w-5 text-white' /> },
  node: {
    label: 'Nodejs',
    icon: <FaNodeJs className='h-5 w-5 text-green-500' />,
  },
}

type BuildRow = {
  id: string
  placeholder: string
  enabled: boolean
  value: string
}
type EnvRow = { id: string; key: string; value: string }
const uid = () => Math.random().toString(36).slice(2, 9)

export default function ConfigureProjectPage() {
  const [selectedFW, setSelectedFW] = useState<FrameworkKey>('react')
  const [fwOpen, setFwOpen] = useState(false)

  const [isBuildOpen, setIsBuildOpen] = useState(false)
  const [isEnvOpen, setIsEnvOpen] = useState(false)

  const buildDefaults = useMemo<BuildRow[]>(
    () => [
      {
        id: uid(),
        placeholder:
          selectedFW === 'react'
            ? 'npm run build'
            : selectedFW === 'node'
              ? 'npm run build (ถ้ามี)'
              : selectedFW === 'deno'
                ? 'deno task build'
                : 'npm run build',
        enabled: false,
        value: '',
      },
      {
        id: uid(),
        placeholder:
          selectedFW === 'react'
            ? 'public (if it exists), or .'
            : selectedFW === 'node'
              ? 'dist หรือ .'
              : selectedFW === 'deno'
                ? 'outputDir ใน deno.json (ถ้ามี) หรือ .'
                : 'public (if it exists), or .',
        enabled: false,
        value: '',
      },
      {
        id: uid(),
        placeholder: "yarn install · 'pnpm install' · or 'bun install'",
        enabled: false,
        value: '',
      },
    ],
    [selectedFW],
  )

  const [buildRows, setBuildRows] = useState<BuildRow[]>(buildDefaults)
  useEffect(() => {
    setBuildRows(prev =>
      prev.map((r, i) => ({
        ...r,
        placeholder: buildDefaults[i]?.placeholder ?? r.placeholder,
      })),
    )
  }, [buildDefaults])

  const [envRows, setEnvRows] = useState<EnvRow[]>([
    { id: uid(), key: '', value: '' },
  ])

  const toggleBuildRow = (id: string) =>
    setBuildRows(rows =>
      rows.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    )

  const addEnv = () =>
    setEnvRows(rows => [...rows, { id: uid(), key: '', value: '' }])
  const delEnv = (id: string) =>
    setEnvRows(rows => rows.filter(r => r.id !== id))

  return (
    <div className='flex min-h-screen flex-col bg-[#090C10] text-white'>
      <Navbar />

      <main className='flex-1 pt-24'>
        <div className='mx-auto w-full max-w-6xl px-6 pt-16'>
          <div className='mb-2 text-3xl font-semibold'>You’re almost done.</div>
          <p className='mb-8 text-sm text-gray-300'>
            Please follow the steps to configure your Project and deploy it.
          </p>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]'>
            <aside className='h-fit'>
              <div className='flex items-center gap-3 rounded-lg border border-[#1a2128] bg-[#0b1014] px-4 py-3'>
                <FaReact className='h-6 w-6 text-cyan-400' />
                <span className='text-sm'>React</span>
              </div>
            </aside>

            <section className='rounded-xl border border-[#1a2128] bg-[#090C10] p-6 shadow'>
              <h2 className='mb-6 text-lg font-semibold'>Configure Project</h2>

              <label className='mb-2 block text-xs text-gray-300'>
                PROJECT NAME
              </label>
              <input
                defaultValue=''
                className='mb-4 h-10 w-full rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 text-sm outline-none focus:ring-2 focus:ring-blue-600'
              />

              <label className='mb-2 block text-xs text-gray-300'>
                FRAMEWORK PRESET
              </label>
              <button
                type='button'
                onClick={() => setFwOpen(v => !v)}
                aria-expanded={fwOpen}
                className='mb-1 flex h-11 w-full items-center justify-between rounded-lg border border-[#1a2128] bg-[#0b1014] px-3'
              >
                <span className='flex items-center gap-3'>
                  {fwMap[selectedFW].icon}
                  <span className='text-sm'>{fwMap[selectedFW].label}</span>
                </span>
                <FaChevronRight
                  className={`h-3.5 w-3.5 text-gray-400 transition-transform ${fwOpen ? 'rotate-90' : ''}`}
                />
              </button>
              {fwOpen && (
                <ul className='mb-4 overflow-hidden rounded-lg border border-[#1a2128] bg-[#0b1014]'>
                  {(Object.keys(fwMap) as FrameworkKey[]).map(k => (
                    <li key={k}>
                      <button
                        type='button'
                        className={`flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-[#111821]
                        ${selectedFW === k ? 'bg-[#0d141b]' : ''}`}
                        onClick={() => {
                          setSelectedFW(k)
                          setFwOpen(false)
                        }}
                      >
                        <span className='flex items-center gap-3'>
                          {fwMap[k].icon}
                          <span className='text-sm'>{fwMap[k].label}</span>
                        </span>
                        {selectedFW === k && (
                          <span className='text-xs text-blue-400'>
                            Selected
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <label className='mb-2 block text-xs text-gray-300'>
                ROOT DIRECTORY
              </label>
              <div className='mb-4 flex items-center gap-2'>
                <input
                  placeholder=''
                  className='h-10 flex-1 rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 text-sm outline-none focus:ring-2 focus:ring-blue-600'
                />
                <button className='h-10 rounded-lg border border-[#1a2128] bg-[#0b1014] px-4 text-sm hover:bg-[#131a20]'>
                  Edit
                </button>
              </div>

              <div className='mb-3 overflow-hidden rounded-lg border border-[#1a2128] bg-[#0b1014]'>
                <button
                  type='button'
                  className='flex w-full items-center justify-between px-4 py-3 text-sm'
                  onClick={() => setIsBuildOpen(v => !v)}
                >
                  <span>Build and Output Settings</span>
                  <FaChevronRight
                    className={`h-3.5 w-3.5 text-gray-400 transition-transform ${isBuildOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {isBuildOpen && (
                  <div className='space-y-3 px-4 pb-4'>
                    {buildRows.map(row => (
                      <div key={row.id} className='flex items-center gap-2'>
                        <input
                          type='text'
                          placeholder={row.placeholder}
                          value={row.value}
                          onChange={e =>
                            setBuildRows(rs =>
                              rs.map(r =>
                                r.id === row.id
                                  ? { ...r, value: e.target.value }
                                  : r,
                              ),
                            )
                          }
                          className='h-9 flex-1 rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 text-xs outline-none focus:ring-2 focus:ring-blue-600'
                        />

                        <button
                          type='button'
                          onClick={() => toggleBuildRow(row.id)}
                          className={`relative h-6 w-12 rounded-full border border-[#1a2128] transition
                            ${row.enabled ? 'bg-blue-600' : 'bg-[#0b1014]'}`}
                          aria-pressed={row.enabled}
                          aria-label='toggle'
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition
                              ${row.enabled ? 'right-0.5' : 'left-0.5'}`}
                          />
                          <span className='absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-300'>
                            {row.enabled ? 'ON' : 'OFF'}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='mb-6 overflow-hidden rounded-lg border border-[#1a2128] bg-[#0b1014]'>
                <button
                  type='button'
                  className='flex w-full items-center justify-between px-4 py-3 text-sm'
                  onClick={() => setIsEnvOpen(v => !v)}
                >
                  <span>Environment Variables</span>
                  <FaChevronRight
                    className={`h-3.5 w-3.5 text-gray-400 transition-transform ${isEnvOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {isEnvOpen && (
                  <div className='px-4 pb-4'>
                    <div className='mb-2 grid grid-cols-[1fr_1fr_36px] items-center gap-2 text-xs text-gray-400'>
                      <span>Key</span>
                      <span>Value</span>
                      <span />
                    </div>

                    <div className='space-y-2'>
                      {envRows.map(r => (
                        <div
                          key={r.id}
                          className='grid grid-cols-[1fr_1fr_36px] items-center gap-2'
                        >
                          <input
                            placeholder='EXAMPLE_NAME'
                            value={r.key}
                            onChange={e =>
                              setEnvRows(rows =>
                                rows.map(x =>
                                  x.id === r.id
                                    ? { ...x, key: e.target.value }
                                    : x,
                                ),
                              )
                            }
                            className='h-9 rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 text-xs outline-none focus:ring-2 focus:ring-blue-600'
                          />
                          <input
                            placeholder='VALUE'
                            value={r.value}
                            onChange={e =>
                              setEnvRows(rows =>
                                rows.map(x =>
                                  x.id === r.id
                                    ? { ...x, value: e.target.value }
                                    : x,
                                ),
                              )
                            }
                            className='h-9 rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 text-xs outline-none focus:ring-2 focus:ring-blue-600'
                          />
                          <button
                            type='button'
                            onClick={() => delEnv(r.id)}
                            className='flex h-9 items-center justify-center rounded-lg border border-[#1a2128] bg-[#0b1014] hover:bg-[#131a20]'
                            aria-label='remove variable'
                          >
                            <FaMinus className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type='button'
                      onClick={addEnv}
                      className='mt-3 inline-flex items-center gap-2 rounded-lg border border-[#1a2128] bg-[#0b1014] px-3 py-2 text-xs hover:bg-[#131a20]'
                    >
                      <FaPlus className='h-3.5 w-3.5' /> Add More
                    </button>
                  </div>
                )}
              </div>

              <button className='h-10 w-full rounded-lg bg-blue-600 text-sm font-medium hover:bg-blue-700'>
                Deploy
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
