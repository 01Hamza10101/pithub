"use client"
import { useEffect } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import ProfileSvg from "@/public/Profile.svg";
import Link from "next/link"

export default function Profile({username="test123"}){ 
  const profile = useSelector((state) => state.User.user)

    return(
        <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full">
              <Image
                src={ profile?.url ? "" : ProfileSvg}
                alt={`${username}'s avatar`}
                width={396}
                height={396}
                className="rounded-full"
                priority
              />
            </div>
            <h1 className="text-2xl font-semibold">{profile?.username}</h1>
            <Link href="/settings/profile" className="w-60 px-3 py-1 text-center text-sm font-semibold border border-[#333] rounded-md hover:bg-gray-700">
              Edit
            </Link>
            {/* <button className="w-full px-3 py-1 text-sm text-gray-600 hover:text-blue-600">
              Block or Report
            </button> */}
          </div>
    )
}