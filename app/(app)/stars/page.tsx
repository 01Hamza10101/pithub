"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddStar, GetRepos } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

import ProfileNav from "@/app/components/comp/Profile";
import StarFilters from "@/app/components/comp/Repo-filter";
import StarredRepos from "../../components/comp/Repos";
import BookIcon from "@/app/components/icons/icon-book.svg";
import DashboardLayout from '@/app/components/comp/DashBoardLayout';

export default function stars() {
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.User.user);
  const repositories: any = useSelector((state: any) => state.User.starredrepos) || [];

  useEffect(() => {
    if (loaded && user?.activity?.starred?.length > 0) {
      dispatch(GetRepos({ type: "starred", repositories: user.activity.starred }))
        .then(() => setLoaded(false));
    }
  }, [loaded, user?.activity?.starred, dispatch]);

  if(user?.activity?.starred?.length === 0){
    return <div className="min-h-screen flex justify-center items-center bg-gray-900 text-xl">No starred repositories available!</div>
  }
  
  return (
    <DashboardLayout>
    <ProfileNav />
    <div className="w-full space-y-6">
      {/* <StarFilters /> */}
      <StarredRepos
        onClickStarred={(name) => dispatch(AddStar({ type: "starred", name }))}
        repositories={repositories}
        starred={user?.activity?.starred}
      />
    </div>
  </DashboardLayout>
  
  );
}