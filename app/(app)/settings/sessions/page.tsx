import React from 'react';
import Image from 'next/image';
import LaptopIcon from '@/app/components/icons/icon-laptop.svg';

export default function Page() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-200">Sessions</h1>
        <p className="text-sm text-gray-100">
          This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.
        </p>
      </div>

      {/* Session Card */}
      <div className="flex items-center justify-between max-w-md rounded-md border border-gray-500 mt-6 p-4 shadow-sm space-x-4">
        {/* Session Indicator */}
        <div className="flex-shrink-0 w-3 h-3 bg-green-700 rounded-full" title="Active Session"></div>

        {/* Session Icon */}
        <div className="flex-shrink-0">
          <Image src={LaptopIcon} alt="Laptop" width={32} height={32} />
        </div>

        {/* Session Details */}
        <div className="flex-grow text-gray-200">
          <div className="text-base font-medium">Dhanbad 152.59.135.209</div>
          <div className="text-sm text-gray-400">Your current session</div>
        </div>
      </div>
    </div>
  );
}
