import Link from "next/link";
import Image from "next/image";
import ProfileIcon from "@/app/components/icons/icon-profile.svg"
import SettingIcon from "@/app/components/icons/icon-setting.svg"
import SeassionIcon from "@/app/components/icons/icon-tower.svg"
import SecurityIcon from "@/app/components/icons/icon-security.svg"

export default function Page({children}:any) {
  
  return (
    <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div className="max-w-80">
        
        <Link
          href={"/settings/profile"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={ProfileIcon} alt='Profile icon'/>
          </div>
          <div className="text-sm ml-2">Public profile</div>
        </Link>

        <Link
          href={"/settings/admin"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={SettingIcon} alt='Profile icon'/>
          </div>
          <div className="text-sm ml-2">Account</div>
        </Link>

        <Link
          href={"/settings/sessions"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={SeassionIcon} alt='Profile icon'/>
          </div>
          <div className="text-sm ml-2">Sessions</div>
        </Link>

        <Link
          href={"/settings/security"}
          className="flex p-2 hover:bg-gray-700 items-center rounded-md cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full">
            <Image src={SecurityIcon} alt='Profile icon'/>
          </div>
          <div className="text-sm ml-2">security</div>
        </Link>

      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
