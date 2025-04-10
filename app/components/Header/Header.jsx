"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import MenuIcon from "@/app/components/icons/icon-menu.svg";
import CancelIcon from "@/app/components/icons/icon-cancel.svg";
import ProfileIcon from "@/app/components/icons/icon-profile.svg";
import SettingIcon from "@/app/components/icons/icon-setting.svg";
import SignoutIcon from "@/app/components/icons/icon-signout.svg";
import AddIcon from "@/app/components/icons/icon-Add.svg";
import StarIcon from "@/app/components/icons/icon-star.svg";
import ProfilceSvg from "@/public/Profile.svg";
import { useSelector } from "react-redux";

export default function Header() {
  const [isMenuOpenLeft, setIsMenuOpenLeft] = useState(false);
  const [isMenuOpenRight, setIsMenuOpenRight] = useState(false);
  const router = useRouter();
  const {profile} = useSelector((state) => state.User.user);

  const Logout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    router.push("/login");
    // Perform logout logic here, such as clearing tokens or redirecting to the login page
    console.log("Logout clicked");
    // Redirect to the login page or perform any other action
  }
  return (
    <header className="bg-gray-900 z-10 text-white">
      {/* Menu Bar  Left Menu Bar*/}
      <div
        className={`h-screen absolute z-10 bg-gray-900 shadow-gray-800 shadow-xl ${
          isMenuOpenLeft ? "min-w-72 px-4" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between p-2">
          <div></div>
          <div className="cursor-pointer hover:bg-gray-700 rounded">
            <Image
              src={CancelIcon}
              onClick={() => setIsMenuOpenLeft(!isMenuOpenLeft)}
              alt="Cancel"
            />
          </div>
        </div>
        <div className="flex p-2 hover:bg-gray-700 rounded-md cursor-pointer">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="text-sm ml-2">01Hamza10101/EarnRewards</div>
        </div>
      </div>
      {/* Main navbar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-md"
              aria-label="Toggle menu"
            >
            </button> */}
            <div className="flex items-center space-x-2">
              <Image
                src={MenuIcon}
                onClick={() => setIsMenuOpenLeft(!isMenuOpenLeft)}
                alt="User avatar"
                width={32}
                height={32}
                className="rounded hover:bg-gray-800 cursor-pointer"
              />
              <span className="text-sm font-medium">01Hamzah10101</span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="relative max-w-xl w-96 hidden md:block">
              <input
                type="search"
                placeholder="Type / to search"
                className="w-full bg-gray-800 px-4 py-1.5 rounded-md text-sm border border-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <kbd className="border border-gray-600 rounded px-1.5 py-0.5 text-xs bg-gray-800">
                  /
                </kbd>
              </div>
            </div>
            <Link className="p-1 hover:bg-gray-800 rounded-md" href={"/new"}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {/* <Image src={AddIcon} width={32} height={32} alt='new Repo'/> */}
            </Link>
            <div className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setIsMenuOpenRight(!isMenuOpenRight)}>
              <Image
                src={profile?.url ? profile.url : ProfilceSvg}
                alt="User profile"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            </div>
            {/* <Image
              src="/placeholder.svg"
              alt="User profile"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
            /> */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-800 overflow-x-scroll scrollbar-hide">
        <div className="px-4">
          <div className="flex space-x-6">
            <Link
              href="/overview"
              className="px-3 py-3 text-sm border-b-2 border-transparent hover:border-gray-300 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                />
              </svg>
              <span>Overview</span>
            </Link>
            <Link
              href="/repositories"
              className="px-3 py-3 text-sm border-b-2 border-transparent hover:border-gray-300 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <span>Repositories</span>
            </Link>
            <Link
              href="/stars"
              className="px-3 py-3 text-sm border-b-2 border-transparent hover:border-gray-300 flex items-center space-x-2"
            >
              <Image src={StarIcon} alt="Star"/>
              <span>Star</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {/* {isMenuOpenLeft && (
        <div className="md:hidden border-t border-gray-800">
          <div className="px-2 py-3 space-y-1">
            <input
              type="search"
              placeholder="Type / to search"
              className="w-full bg-gray-800 px-4 py-2 rounded-md text-sm border border-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
            />
          </div>
        </div>
      )} */}
      {/* Menu bar Right */}
      <div
        className={`h-screen z-10 absolute top-0 right-0 bg-gray-900 shadow-gray-800 shadow-xl ${
          isMenuOpenRight ? "min-w-72 px-4" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between p-2">
          <div></div>
          <div className="cursor-pointer hover:bg-gray-700 rounded">
            <Image
              src={CancelIcon}
              onClick={() => setIsMenuOpenRight(!isMenuOpenRight)}
              alt="Cancel"
            />
          </div>
        </div>
        <Link
          href={"/overview"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={ProfileIcon} alt="Profile icon" />
          </div>
          <div className="text-sm ml-2">Your profile</div>
        </Link>
        <Link
          href={"/settings/profile"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={SettingIcon} alt="Profile icon" />
          </div>
          <div className="text-sm ml-2">Setting</div>
        </Link>
        <div className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer" onClick={Logout} >
          <div className="w-5 h-5 rounded-full">
            <Image src={SignoutIcon} alt="Profile icon" />
          </div>
          <div className="text-sm ml-2">Sign out</div>
        </div>
      </div>
    </header>
  );
}
