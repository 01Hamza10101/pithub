interface StarredRepo {
    name: string
    owner: string
    description: string
    language?: string
    languageColor?: string
    stars: number
    forks: number
    updatedAt: string
  }
  
  const starredRepos: StarredRepo[] = [
    {
      name: 'rizzui',
      owner: 'rizzui',
      description: 'A Modern and Minimal React UI Library built with TailwindCSS',
      language: 'MDX',
      languageColor: '#fcb32c',
      stars: 157,
      forks: 19,
      updatedAt: '2 weeks ago'
    },
    {
      name: 'chai-backend',
      owner: 'hiteshchoudhary',
      description: 'A video series on chai aur code youtube channel',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 5677,
      forks: 946,
      updatedAt: 'on Aug 18, 2024'
    }
  ]
  
  export default function StarredRepos() {
    return (
      <div className="divide-y">
        {starredRepos.map((repo) => (
          <div key={repo.name} className="py-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div>
                  <a
                    href={`/${repo.owner}/${repo.name}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {repo.owner} / {repo.name}
                  </a>
                </div>
                <p className="text-gray-600">{repo.description}</p>
                <div className="flex items-center gap-4 text-sm">
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
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                    </svg>
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 011 6.25v-.878a2.25 2.25 0 111.5 0zM3.75 7h.5v.75h-.5V7zm4.75.75h.5V7h-.5v.75zm0-3h.5V4h-.5v.75zm-4 3h.5V7h-.5v.75zm0-3h.5V4h-.5v.75z" />
                    </svg>
                    <span>{repo.forks}</span>
                  </div>
                  <span className="text-gray-600">Updated {repo.updatedAt}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1 text-sm border border-[#333] rounded-md hover:bg-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                Starred
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  