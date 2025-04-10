'use client'

import { useState } from 'react'

export default function StarFilters() {
  const [search, setSearch] = useState('')

  const handleChange = () => {

  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search repo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border bg-gray-700 border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">

        <div className="space-y-2">
          <select
            id="pronouns"
            name="pronouns"
            value={"Type: All"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#333] hover:cursor-pointer rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Type: All">Type: All</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <select
            id="pronouns"
            name="pronouns"
            value={"Language"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#333] hover:cursor-pointer rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Language">Language</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <select
            id="pronouns"
            name="pronouns"
            value={"Sort by: Recently starred"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#333] hover:cursor-pointer rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Sort by: Recently starred">Sort by: Recently starred</option>
            <option value="Female">Female</option>
          </select>
        </div>

      </div>
    </div>
  )
}