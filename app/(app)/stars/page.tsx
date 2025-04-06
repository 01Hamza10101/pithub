import Image from "next/image";

import ProfileNav from "@/app/components/comp/Profile";
import Lists from "./lists";
import StarFilters from "./star-filter";
import StarredRepos from "./StarredRepos";
import BookIcon from "@/app/components/icons/icon-book.svg";

export default function stars() {
  return (
    <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div>
        <ProfileNav />
      </div>
      <div>
        <div className="flex justify-between py-2">
          <div className="text-base items-center font-semibold">Lists (1)</div>
          <button type="submit" className="px-3 py-2 flex justify-center items-center bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
              </svg>
            <span className="ml-1">New</span>
          </button>
        </div>
        <Lists />
        <div className="mt-4">
          <StarFilters />
          <StarredRepos />
        </div>
      </div>
    </div>
  );
}
