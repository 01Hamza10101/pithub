"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

function ContributionGraph() {
  const [selectedYear, setSelectedYear] = useState("2025")

  const generateContributionData = () => {
    const data = {}
    const now = new Date()
    const currentYear = Number.parseInt(selectedYear)

    for (let i = 0; i < 365; i++) {
      const date = new Date(currentYear, 0, 1)
      date.setDate(date.getDate() + i)

      if (date > now && currentYear === now.getFullYear()) continue

      const dateString = date.toISOString().split("T")[0]
      data[dateString] = Math.floor(Math.random() * 5)
    }

    return data
  }

  const contributionData = generateContributionData()
  const totalContributions = Object.values(contributionData).reduce((sum, count) => sum + count, 0)

  const getMonths = () => {
    const months = []
    for (let i = 0; i < 12; i++) {
      const date = new Date(Number.parseInt(selectedYear), i, 1)
      months.push(date.toLocaleString("default", { month: "short" }))
    }
    return months
  }

  const getContributionClass = (count) => {
    if (count === 0) return "bg-gray-800"
    if (count === 1) return "bg-green-900"
    if (count === 2) return "bg-green-700"
    if (count === 3) return "bg-green-600"
    return "bg-green-500"
  }

  const renderGrid = () => {
    const cells = []
    const weekdays = ["Mon", "", "Wed", "", "Fri", "", ""]

    cells.push(
      <div key="weekdays" className="flex flex-col gap-[3px] text-xs text-gray-500 pr-2">
        {weekdays.map((day, index) => (
          <div key={index} className="h-[11px] flex items-center">
            {day}
          </div>
        ))}
      </div>,
    )

    const startDate = new Date(Number.parseInt(selectedYear), 0, 1)
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

    for (let week = 0; week < 53; week++) {
      const weekCells = []

      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + week * 7 + day)

        const dateString = currentDate.toISOString().split("T")[0]
        const contributionCount = contributionData[dateString] || 0

        weekCells.push(
          <div
            key={dateString}
            className={`h-[11px] w-[11px] rounded-sm ${getContributionClass(contributionCount)}`}
            title={`${contributionCount} contributions on ${dateString}`}
          />,
        )
      }

      cells.push(
        <div key={`week-${week}`} className="flex flex-col gap-[3px]">
          {weekCells}
        </div>,
      )
    }

    return cells
  }

  return (
    <div className="text-white p-4 rounded-lg max-w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">{totalContributions} contributions in the last year</h2>
        {/* <button className="flex items-center gap-1 text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-700">
          Contribution settings
          <ChevronDown size={16} />
        </button> */}
         <div className="space-y-2">
          <select
            id="pronouns"
            name="pronouns"
            // value={"2024"}
            // onChange={handleChange}
            className="w-full px-3 py-2 border border-[#333] hover:cursor-pointer rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Language">2925</option>
            <option value="Female">2024</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide border border-gray-800 rounded-lg p-4 bg-gray-900">
        <div className="w-[790px] ">
          <div className="mb-2 flex gap-2 ml-[50px] text-sm text-gray-400">
            {getMonths().map((month, index) => (
              <div key={index} className="w-[50px] text-center">
                {month}
              </div>
            ))}
          </div>

          <div className="flex gap-[3px]">{renderGrid()}</div>

          <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
            <a href="#" className="hover:text-blue-400">
              Learn how we count contributions
            </a>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="h-[10px] w-[10px] rounded-sm bg-gray-800"></div>
                <div className="h-[10px] w-[10px] rounded-sm bg-green-900"></div>
                <div className="h-[10px] w-[10px] rounded-sm bg-green-700"></div>
                <div className="h-[10px] w-[10px] rounded-sm bg-green-600"></div>
                <div className="h-[10px] w-[10px] rounded-sm bg-green-500"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Graph() {
  return (
    <div className="max-w-full px-4">
      <ContributionGraph />
    </div>
  )
}
