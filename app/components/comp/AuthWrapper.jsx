"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetUserData } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserData() {
      try {
        await dispatch(GetUserData());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [dispatch]);

  return <>{children}</>;
}
