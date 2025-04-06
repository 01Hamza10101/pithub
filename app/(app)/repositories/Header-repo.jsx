'use client'
import { useState } from 'react'

export function RepositoryFilters() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Find a repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
          Type
          <span className="ml-1">▼</span>
        </button>
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
          Language
          <span className="ml-1">▼</span>
        </button>
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
          Sort
          <span className="ml-1">▼</span>
        </button>
      </div>
    </div>
  )
}