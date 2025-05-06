"use client"

import { useMemo, useState } from "react"

export default function ContributionGraph({data}) {
  const [selectedYear, setSelectedYear] = useState("2025")
  const rawData = {}

  data?.map(item => item.contributions).flat().forEach(({ date, count }) => {
    const day = new Date(date).toISOString().split('T')[0];
    if (!rawData[day]) {
      rawData[day] = count;
    } else {
      rawData[day] += count;
    }
  });

  const contributionData = useMemo(() => {
    const data = {}
    const now = new Date()
    const year = parseInt(selectedYear)

    for (let i = 0; i < 365; i++) {
      const date = new Date(year, 0, 1)
      date.setDate(date.getDate() + i)
      if (year === now.getFullYear() && date > now) continue

      const key = date.toISOString().split("T")[0]
      data[key] = rawData[key] ?? 0
    }

    return data
  }, [selectedYear])

  const totalContributions = useMemo(
    () => Object.values(contributionData).reduce((sum, count) => sum + count, 0),
    [contributionData]
  )

  const getMonths = () => {
    return Array.from({ length: 12 }, (_, i) =>
      new Date(parseInt(selectedYear), i, 1).toLocaleString("default", { month: "short" })
    )
  }

  const getContributionClass = (count) => {
    return [
      "bg-gray-800",
      "bg-green-900",
      "bg-green-700",
      "bg-green-600",
      "bg-green-500"
    ][Math.min(count, 4)]
  }

  const renderGrid = () => {
    const cells = []
    const weekdays = ["Mon", "", "Wed", "", "Fri", "", ""]

    cells.push(
      <div key="weekdays" className="flex flex-col gap-[3px] text-xs text-gray-500 pr-2">
        {weekdays.map((day, idx) => (
          <div key={idx} className="h-[11px] flex items-center">{day}</div>
        ))}
      </div>
    )

    const startDate = new Date(parseInt(selectedYear), 0, 1)
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

    for (let week = 0; week < 53; week++) {
      const weekCells = []

      for (let day = 0; day < 7; day++) {
        const current = new Date(startDate)
        current.setDate(startDate.getDate() + week * 7 + day)
        const key = current.toISOString().split("T")[0]
        const count = contributionData[key] || 0

        weekCells.push(
          <div
            key={key}
            className={`h-[11px] w-[11px] rounded-sm ${getContributionClass(count)}`}
            title={`${count} contributions on ${key}`}
          />
        )
      }

      cells.push(
        <div key={`week-${week}`} className="flex flex-col gap-[3px]">{weekCells}</div>
      )
    }

    return cells
  }

  return (
    <div className="text-white p-4 rounded-lg w-full">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg text-gray-200">{totalContributions} contributions in {selectedYear}</h2>
      <div className="space-y-2">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-[#333] hover:cursor-pointer rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[2025, 2024, 2023].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  
    <div className="overflow-x-auto scrollbar-hide border border-gray-800 rounded-lg p-4 bg-gray-900">
      <div>
        <div className="mb-2 flex gap-8 ml-[50px] text-sm text-gray-400">
          {getMonths().map((month, idx) => (
            <div key={idx} className="w-[50px] text-center">{month}</div>
          ))}
        </div>
  
        <div className="flex gap-[2px] p-2">{renderGrid()}</div>
  
        <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
          <a href="#" className="hover:text-blue-400">Learn how we count contributions</a>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((count) => (
                <div key={count} className={`h-[10px] w-[10px] rounded-sm ${getContributionClass(count)}`}></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
  )
}
