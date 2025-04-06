import React from "react";

export default function Page() {
  return (
    <div className="flex  p-4">
      <div className="w-full max-w-md p-6 rounded-md shadow-md space-y-6">
        {/* Update Username Section */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-100">
              Username
            </label>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Username
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-red-700">Delete Account</h2>
          <p className="text-gray-100">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            type="button"
            className="w-full px-4 py-2 border border-red-700 text-red-700 font-semibold rounded-md hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Your Account
          </button>
        </div>
      </div>
    </div>
  );
}
