"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/app/components/Header/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicRoutes = ["/login", "/signup"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    } else if (token && pathname === "/login") {
        router.replace("/overview");
      } else {
        setIsAuth(!!token);
        setLoading(false);
      }
  }, [pathname, router]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center bg-gray-900 text-xl">Loading...</div>;
  }

  return (
    <>
      {/* {isAuth && pathname !== "/login" && <Header />} */}
      {children}
    </>
  );
}
