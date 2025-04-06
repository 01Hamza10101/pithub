'use client'
import ProfileNav from '@/app/components/comp/Profile'
import RepoFilter from './Repo-filter'

interface Repository {
  name: string
  description?: string
  language?: string
  visibility: 'Public' | 'Private'
  updatedAt: string
  languageColor?: string
  activityGraph?: number[]
}

const repositories: Repository[] = [
  {
    name: 'test',
    visibility: 'Public',
    updatedAt: '2 days ago',
    activityGraph: [0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    name: 'RP',
    visibility: 'Public',
    language: 'TypeScript',
    languageColor: '#2b7489',
    updatedAt: 'last week',
    activityGraph: [0, 1, 1, 0, 0, 1, 0, 0, 0, 0]
  },
  {
    name: 'ShortCutForCODE',
    visibility: 'Public',
    updatedAt: '3 weeks ago',
    activityGraph: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
  },
  {
    name: 'PixelEarn',
    visibility: 'Public',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    updatedAt: 'on Oct 28, 2024',
    activityGraph: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0]
  }
]

function ActivityGraph({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const height = 20
  
  return (
    <svg width="100" height={height} className="text-green-500">
      {data.map((value, i) => {
        const h = value === 0 ? 3 : (value / max) * height
        return (
          <rect
            key={i}
            x={i * 10}
            y={height - h}
            width="8"
            height={h}
            rx="1"
            fill="currentColor"
            opacity={value === 0 ? 0.2 : 1}
          />
        )
      })}
    </svg>
  )
}

export default function Repository() {
  const username = "0101Hanzla01"
  return (
  <div className='px-4 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8'>
    <div>
      <ProfileNav username={"test123"}/>
    </div>
    <div className="divide-y">
      <RepoFilter/>
      {repositories.map((repo) => (
        <div key={repo.name} className="py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={`${username}/${repo.name}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
                <span className="text-xs text-gray-600 border border-[#333] rounded-full px-2">
                  {repo.visibility}
                </span>
              </div>
              {repo.description && (
                <p className="mt-1 text-gray-600">{repo.description}</p>
              )}
              <div className="mt-2 flex items-center gap-4 text-sm">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                <span className="text-gray-600">Updated {repo.updatedAt}</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <ActivityGraph data={repo.activityGraph || []} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}