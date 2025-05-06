"use client";

import Link from "next/link";
import ContributionGraph from "./graph";
import ContributionActivity from "./activity";
import ProfileNav from "@/app/components/comp/Profile";
import { useDispatch, useSelector } from "react-redux";
import { Getcontributionrecords, GetRepos } from '@/app/ReduxToolkit/ReduxSlice/User.Slice';
import { useEffect } from "react";
import DashboardLayout from '@/app/components/comp/DashBoardLayout';

export default function ProfilePage() {
  const { contributionrecords, user, repositories } = useSelector((state: any) => state.User);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!user?.activity?.repositories) return;
    dispatch(Getcontributionrecords({ repositories: user?.activity?.repositories }));
    dispatch(GetRepos({ repositories: user.activity.repositories }));
  }, [user?.activity?.repositories]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Sidebar / Profile Navigation */}
        <div className="md:w-1/3 w-full">
          <ProfileNav />
        </div>

        {/* Main Content */}
        <div className="space-y-6 w-full md:w-2/3">
          {/* Contribution Graph Section */}
          <section className="h-64 flex justify-center items-center bg-gray-900 rounded-md shadow-sm border border-gray-700 p-4">
            {contributionrecords === undefined || contributionrecords === null ? (
              <div className="text-xl text-gray-300">Loading...</div>
            ) : contributionrecords.length > 0 ? (
              <ContributionGraph data={contributionrecords} />
            ) : (
              <div className="text-xl text-gray-400">No contribution records found.</div>
            )}
          </section>

          {/* Contribution Activity Section */}
          <section className="bg-gray-900 rounded-md shadow-sm border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Contribution Activity</h2>
              {/* Optional link to GitHub or history */}
              {/* <Link href="/activity" className="text-sm text-blue-500 hover:underline">See more</Link> */}
            </div>
            {repositories.length > 0 ? (
              <ContributionActivity
                repositories={repositories}
                contributionrecords={contributionrecords}
              />
            ) : (
              <div className="text-gray-400">No recent repositories found.</div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
