"use client"
// import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ContributionGraph from "./graph"
import ContributionActivity from "./activity"
import ProfileNav from "@/app/components/comp/Profile"

interface ProfilePageProps {
  params: {
    username: string
  }
}

// export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
//   return {
//     title: `${params.username} - Overview`,
//     description: `${params.username}'s GitHub profile and contributions.`,
//   }
// }

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Profile sidebar */}
          <ProfileNav username={username}/>
          {/* Main content */}
          <div className="space-y-6">
            {/* <ProfileNav
              stats={{
                repositories: 14,
                stars: 2,
              }}
            /> */}

            {/* Pinned repositories */}
            <section>
              <h2 className="text-base font-semibold mb-2">Pinned</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#333] rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                    </svg>
                    <Link href="/ShortCutForCODE" className="font-semibold hover:text-blue-600">
                      ShortCutForCODE
                    </Link>
                    <span className="text-xs text-gray-600 border border-[#333] rounded-full px-2">Public</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contribution section */}
            <section>
              <h2 className="text-sm text-gray-600 mb-2">
                101 contributions in the last year
              </h2>
              <ContributionGraph />
            </section>

            {/* Activity section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="">Contribution activity</h2>
                <select className="text-sm border border-[#333] bg-black cursor-pointer rounded-md px-2 py-1">
                  <option defaultChecked>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <ContributionActivity />
            </section>
          </div>

        </div>
      </div>
    </div>
  )
}