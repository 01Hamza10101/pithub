'use client';

import { useEffect, useState } from "react"; // ✅ added useState here
import { useDispatch } from "react-redux";
import { GetUserData } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const result = await dispatch(GetUserData());

      if (GetUserData.rejected.match(result)) {
        const errorMsg = result.payload?.message || 'Unknown error';

        if (errorMsg === 'Invalid or missing token.') {
          localStorage.removeItem('token');
          window.location.href = "/login";
        }

        console.error('Error fetching user data:', errorMsg);
      }

      setLoading(false); // ✅ set loading to false after the check
    }

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
