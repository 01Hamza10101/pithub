import Image from "next/image";
import Link from "next/link";
import FolderIcon from "@/app/components/icons/icon-folder.svg";
import FileIcon from "@/app/components/icons/icon-file.svg";
import StarIcon from "@/app/components/icons/icon-star.svg";
import StarredIcon from "@/app/components/icons/icon-Starred.svg";
import CopyIcon from "@/app/components/icons/icon-Copy.svg";
import DownloadIcon from "@/app/components/icons/icon-Download.svg";
import PenIcon from "@/app/components/icons/icon-pen.svg";

export function Folder() {
  const filename = "/0101Hanzla01/PixelEarn.js";
  const starred = true;
  const Readme = [
    "This is a Next.js project bootstrapped with create-next-app.",
    "Getting Started",
    "First, run the development server:",
    "Open http:",
    "You can start editing the page by modifying app/page.js. The page auto-updates as you edit the file.",
    "This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.",
    "Learn More",
  ];
  return (
    <div className="p-4">
      <div className="flex">
        <div className="p-3 flex">
          <span className="font-bold">0101Hanzla023</span>
          <span className="text-xs ml-2 h-6 border border-[#333] rounded-full px-3 py-1">
            Public
          </span>
          <button className="ml-2 flex items-center gap-1 px-3 py-1 h-8 text-sm border border-[#333] rounded-md hover:bg-gray-900">
            <Image src={starred ? StarredIcon : StarIcon} alt="Star" />
            <span>Starred</span>
            <span>({0})</span>
          </button>
          <div className="ml-2 px-3 py-1 rounded-md border border-[#333]">
            Watched 0
          </div>
        </div>
      </div>
      <div className="flex">
        <button className="px-3 mx-3 relative py-1 text-sm border border-[#333] rounded-md font-extralight hover:bg-gray-900">
          main
          <span className="ml-1 text-xs">▼</span>
          <div className="flex absolute flex-col bg-black min-w-32 p-2 rounded-md hidden border border-[#333]">
            <div className="hover:bg-gray-900 p-1 rounded-md">main</div>
            <div className="hover:bg-gray-900 p-1 rounded-md">master</div>
          </div>
        </button>
        <div className="ml-2 px-3 py-1 rounded-md border border-[#333]">
          Branches 0
        </div>
        <button className="flex items-center gap-1 px-3 mx-3 relative py-1 text-sm border border-[#333] rounded-md font-extralight hover:bg-gray-900">
          <span>Add file</span>
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
          <div className="flex absolute flex-col bg-black min-w-32 p-2 rounded-md hidden border border-[#333]">
            <div className="hover:bg-gray-700 p-1 rounded-md">
              Create new file
            </div>
            <div className="hover:bg-gray-700 p-1 rounded-md">Upload files</div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <Link href={`${filename}`}>
          <div className="flex justify-between items-center p-2 border border-[#333] rounded-md hover:bg-gray-900 transition-shadow">
            <div className="flex items-center">
              <Image src={FolderIcon} alt="Folder" />
              <span className="ml-2 text-sm hover:underline">comp</span>
            </div>
            <div className="text-sm">first commit</div>
            <div className="text-sm">last week</div>
          </div>
        </Link>
        <Link href={`${filename}`}>
          <div className="flex justify-between items-center p-2 border border-[#333] rounded-md hover:bg-gray-900 transition-shadow">
            <div className="flex items-center">
              <Image src={FileIcon} alt="File" />
              <span className="ml-2 text-sm hover:underline">index.js</span>
            </div>
            <div className="text-sm">first commit</div>
            <div className="text-sm">last week</div>
          </div>
        </Link>
      </div>
      <div className="p-3 border border-[#333] rounded-md">
        <div className="flex justify-between items-center pb-2 border-b-2 mb-2 border-[#333]">
          <span className="font-bold">README</span>
          <div className="flex">
            <div className="flex justify-between items-center hover:bg-gray-900 cursor-pointer rounded-md border border-[#333]">
              <Image
                className="my-1 mx-2"
                src={CopyIcon}
                width={18}
                height={18}
                alt="Copy"
              />
              <Image
                className="my-1 mx-2"
                src={DownloadIcon}
                width={26}
                height={26}
                alt="Download File"
              />
            </div>
            <div className="flex justify-between items-center ml-2 hover:bg-gray-900 cursor-pointer rounded-md border border-[#333]">
              <Image src={PenIcon} alt="Pen"/>
            </div>
          </div>
        </div>

        {Readme.map((text, i) => {
          return (
            <div className="text-sm" key={i}>
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
