import React, { useState ,useMemo} from 'react';
import Image from 'next/image';
import starIcon from '../../components/icons/icon-star.svg'

import Link from 'next/link';

interface Repo {
  isStarred: any;
  name: string;
  owner: string;
  description: string;
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
  updatedAt: string;
}


export default function StarredRepos({onClickStarred,repositories,starred}: any) {
  const enhancedRepos = useMemo(() => {
    const ReposData = repositories.map((repo:any) => ({
      ...repo,
      isStarred: starred?.includes(repo.name),
    }));
    console.log(ReposData,starred?.includes("Hanzla123/project-120-GitHub"))
    return ReposData
  }, [repositories, starred]);

  function formatSmartDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
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
      return 'Updated Just now';
    } else if (diffMinutes < 60) {
      return `Updated ${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `Updated ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `Updated ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return `Updated on ${localDate.toLocaleDateString('en-IN', options)}`;
    }
  }

  return (
    <div className="divide-y dark:divide-gray-700">
      {enhancedRepos.map((repo: Repo) => (
        <div key={repo.name} className="py-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div>
                <Link
                  href={repo.name}
                  className="text-xl font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {repo.name.split('/').slice(1,2)}
                </Link>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{repo.description}</p>
              <div className="flex items-center gap-4 text-sm dark:text-gray-300">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 fill-yellow-500 dark:fill-yellow-400" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                  </svg>
                  <span>{repo.stars}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 dark:fill-gray-300" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 011 6.25v-.878a2.25 2.25 0 111.5 0zM3.75 7h.5v.75h-.5V7zm4.75.75h.5V7h-.5v.75zm0-3h.5V4h-.5v.75zm-4 3h.5V7h-.5v.75zm0-3h.5V4h-.5v.75z" />
                  </svg>
                  <span>{repo.forks}</span>
                </div> */}
                <span className="text-gray-600 dark:text-gray-400">{formatSmartDate(repo.updatedAt)}</span>
              </div>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm border border-[#333] rounded-md hover:bg-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              onClick={() => onClickStarred(repo?.name)}
            >
              {/* <svg className="w-4 h-4 fill-yellow-500 dark:fill-yellow-400" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg> */}
              {repo?.isStarred ? (
                  <svg className="w-4 h-4 fill-yellow-500" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                  </svg>
                ) : (
                  <Image
                    src={starIcon}
                    alt="Star"
                    className="w-4 h-4 dark:brightness-200"
                    width={16}
                    height={16}
                  />
                )}
              Star
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}