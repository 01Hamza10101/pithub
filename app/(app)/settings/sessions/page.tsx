"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import LaptopIcon from '@/app/components/icons/icon-laptop.svg';
import { useSelector } from 'react-redux';

export default function Page() {
  const sessions = useSelector((state: any) => state.User.user.security?.sessions || []);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-200">Sessions</h1>
        <p className="text-sm text-gray-100">
          This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.
        </p>
      </div>

      {
        sessions?.map(({ ip ,location}: any, i: number) => {

          return (
            <div key={i} className="flex items-center justify-between max-w-md rounded-md border border-gray-500 mt-6 p-4 shadow-sm space-x-4">
              <div className="flex-shrink-0 w-3 h-3 bg-green-700 rounded-full" title="Active Session"></div>
              <div className="flex-shrink-0">
                <Image src={LaptopIcon} alt="Laptop" width={32} height={32} />
              </div>
              <div className="flex-grow text-gray-200">
                <div className="text-base font-medium">{location} {ip}</div>
                {i == 0 ? (<div className="text-sm text-gray-400">Your current session</div>) : ""}
              </div>
            </div >
          )
        })
      }

    </div>
  );
}
