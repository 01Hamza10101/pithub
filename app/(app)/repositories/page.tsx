'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddStar } from '@/app/ReduxToolkit/ReduxSlice/User.Slice'
import { GetRepos } from '@/app/ReduxToolkit/ReduxSlice/User.Slice'
import starIcon from '../../components/icons/icon-star.svg'
import ProfileNav from '@/app/components/comp/Profile'
import RepoFilter from '@/app/components/comp/Repo-filter'
import Repos from '@/app/components/comp/Repos'
import DashboardLayout from '@/app/components/comp/DashBoardLayout';
import Link from 'next/link'
import Image from 'next/image'

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
  const [loading, setloading] = useState(true);

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
      return "Updated Just now";
    } else if (diffMinutes < 60) {
      return `Updated ${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `Updated ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `Updated ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else {
      return `Updated on ${localDate.toLocaleDateString("en-IN", options)}`;
    }
  }


  const username = user?.profile?.username || 'UnknownUser'

  
  useEffect(() => {
    if (loading && user?.activity?.repositories?.length > 0) {
      dispatch(GetRepos({ repositories: user.activity.repositories }))
        .then(() => setloading(false));
    }else{setloading(false)}
  }, [loading, user?.activity?.repositories]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center bg-gray-900 text-xl">Loading...</div>;
  }

  return (
    <DashboardLayout>
    <ProfileNav username={username} />
    <div className="w-full space-y-6">
      {/* <RepoFilter /> */}
      {repositories.length === 0 ? (
        <p className="py-6 text-gray-400">No repositories available.</p>
      ) : (
        <Repos
          onClickStarred={(name) => dispatch(AddStar({ type: "starred", name }))}
          repositories={repositories}
          starred={user?.activity?.starred}
        />
      )}
    </div>
  </DashboardLayout>
  
  )
}

