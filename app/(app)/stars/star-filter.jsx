'use client'

import { useState } from 'react'

export default function StarFilters() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search stars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border bg-gray-700 border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm border border-[#333] rounded-md hover:bg-gray-700">
          Type: All
          <span className="ml-1">▼</span>
        </button>
        <button className="px-3 py-1 text-sm border border-[#333] rounded-md hover:bg-gray-700">
          Language
          <span className="ml-1">▼</span>
        </button>
        <button className="px-3 py-1 text-sm border border-[#333] rounded-md hover:bg-gray-700">
          Sort by: Recently starred
          <span className="ml-1">▼</span>
        </button>
      </div>
    </div>
  )
}