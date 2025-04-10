'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetRepos } from '@/app/ReduxToolkit/ReduxSlice/User.Slice'
import ProfileNav from '@/app/components/comp/Profile'
import RepoFilter from './Repo-filter'
import Link from 'next/link'

interface Repository {
  name: string
  description?: string
  language?: string
  visibility: 'Public' | 'Private'
  updatedAt: string
  languageColor?: string
  activityGraph?: number[]
}

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
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.User.user)
  const repositories: Repository[] = useSelector((state: any) => state.User.repositories) || []

  function formatSmartDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata"
    };
  
    const date = new Date(dateString);
    const now = new Date();
  
    // Convert both to IST timezone
    const utcOffset = 330 * 60 * 1000; // IST = UTC+5:30
    const localDate = new Date(date.getTime() + utcOffset);
    const localNow = new Date(now.getTime() + utcOffset);
  
    const diffMs = localNow.getTime() - localDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
      return `Updated on ${localDate.toLocaleDateString("en-IN", options)}`;
    }
  }
  
  
  const username = user?.profile?.username || 'UnknownUser'

  useEffect(() => {
    if (user?.activity?.repositories) {
      dispatch(GetRepos({ repositories: user.activity.repositories }))
    }
  }, [dispatch, user])

  return (
    <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div>
        <ProfileNav username={username} />
      </div>

      <div className="divide-y">
        <RepoFilter />

        {repositories.length === 0 ? (
          <p className="py-6 text-gray-500">No repositories available.</p>
        ) : (
          repositories.map((repo: Repository) => (
            <div key={repo.name} className="py-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`https://github.com/${username}/${repo.name}`}
                      target="_blank"
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      {repo.name.split('/').pop()}
                    </Link>
                    <span className="text-xs text-gray-600 border border-[#333] rounded-full px-2">
                      {repo.status}
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
                    <span className="text-gray-600">{formatSmartDate(repo.updatedAt)}</span>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <ActivityGraph data={repo.activityGraph || []} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
