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
  const {profile,activity} = useSelector((state) => state.User.user);

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
  className={`h-screen fixed top-0 left-0 z-50 w-72 backdrop-blur-md bg-gray-800/70 shadow-lg transform transition-transform duration-300 ease-in-out ${
    isMenuOpenLeft ? "translate-x-0" : "-translate-x-full"
  } px-5 py-6`}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-lg font-semibold text-white tracking-wide">Your Repos</h3>
    <button
      onClick={() => setIsMenuOpenLeft(false)}
      className="p-1 rounded hover:bg-gray-700/60 transition"
    >
      <Image src={CancelIcon} alt="Close" className="w-5 h-5" />
    </button>
  </div>

  {/* Repositories */}
  <nav className="flex flex-col gap-3">
    {activity?.repositories?.map((repo, index) => (
      <Link
        key={index}
        href={`/${repo}`}
        className="group flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 bg-gray-700/40 hover:bg-blue-600 transition-all duration-200"
      >
        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full group-hover:bg-white transition" />
        <span className="text-sm font-medium truncate">{repo.split('/').slice(1,2).join('/')}</span>
      </Link>
    ))}
  </nav>
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
                onClick={() => {setIsMenuOpenLeft(!isMenuOpenLeft);setIsMenuOpenRight(false)}}
                alt="User avatar"
                width={32}
                height={32}
                className="rounded hover:bg-gray-800 cursor-pointer"
              />
              <span className="text-sm font-medium">{profile?.username}</span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* <div className="relative max-w-xl w-96 hidden md:block">
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
            </div> */}
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
            <div className="w-8 h-8 rounded-full cursor-pointer" onClick={() => {setIsMenuOpenRight(!isMenuOpenRight);setIsMenuOpenLeft(false)}}>
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
  className={`h-screen fixed top-0 right-0 z-50 backdrop-blur-md bg-gray-800/70 shadow-xl border-l border-gray-800 transform transition-transform duration-300 ${
    isMenuOpenRight ? "translate-x-0" : "translate-x-full"
  } w-72 px-5 py-6`}
>
  {/* Close Button */}
  <div className="flex justify-between items-center mb-6 w-full">
    <h3 className="text-lg font-semibold text-white tracking-wide">
      Settings
    </h3>
    <button
      onClick={() => setIsMenuOpenRight(false)}
      className="p-2 rounded-md hover:bg-gray-700/60 transition"
    >
      <Image src={CancelIcon} alt="Close" className="w-5 h-5" />
    </button>
  </div>

  {/* Menu Items */}
  <nav className="flex flex-col gap-3">
    <Link
      href="/overview"
      className="group flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 bg-gray-700/40 hover:bg-blue-600 transition-all duration-200"
    >
      <Image src={ProfileIcon} alt="Profile icon" className="w-5 h-5" />
      <span className="text-sm font-medium">Your Profile</span>
    </Link>

    <Link
      href="/settings/profile"
      className="group flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 bg-gray-700/40 hover:bg-blue-600 transition-all duration-200"
    >
      <Image src={SettingIcon} alt="Settings icon" className="w-5 h-5" />
      <span className="text-sm font-medium">Settings</span>
    </Link>

    <button
      onClick={Logout}
      className="group flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 bg-gray-700/40 hover:bg-blue-600 transition-all duration-200 hover:bg-red-600 transition w-full text-left"
    >
      <Image src={SignoutIcon} alt="Sign out icon" className="w-5 h-5" />
      <span className="text-sm font-medium">Sign out</span>
    </button>
  </nav>
</div>

    </header>
  );
}
