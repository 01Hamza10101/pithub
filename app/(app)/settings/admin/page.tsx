"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

  const defaultConfig = () => {
    const accessToken = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

export default function AccountSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.User.user);
  const [username, setUsername] = useState(user?.profile?.username || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastCheckedUsername, setLastCheckedUsername] = useState("");

  // Reset availability check when username changes
  useEffect(() => {
    if (username !== lastCheckedUsername) {
      setIsAvailable(null);
    }
  }, [username, lastCheckedUsername]);

  const checkUsernameAvailability = async () => {
    if (!username.trim()) return;
    
    setIsChecking(true);
    setUpdateError("");
    setIsAvailable(null);

    try {
      const response = await fetch(
        `/api/auth/check-username?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check username");
      }

      const { available } = await response.json();
      setIsAvailable(available);
      setLastCheckedUsername(username);
    } catch (err) {
      setUpdateError("Error checking username availability");
    } finally {
      setIsChecking(false);
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError("");

    if (!username.trim()) {
      setUpdateError("Username is required");
      setIsUpdating(false);
      return;
    }

    if (username === user?.profile?.username) {
      setUpdateError("New username must be different");
      setIsUpdating(false);
      return;
    }

    if (isAvailable === false) {
      setUpdateError("Username is not available");
      setIsUpdating(false);
      return;
    }

    if (isAvailable === null) {
      setUpdateError("Please check username availability first");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await fetch("/api/settings/update-username", {
        method: "PUT",
        ...defaultConfig(),
        body: JSON.stringify({
          currentUsername: user?.profile?.username,
          newUsername: username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update username");
      }

      // dispatch(updateUser(data.user));
      router.refresh();
      setIsAvailable(null); // Reset availability after successful update
    } catch (err: any) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAccountDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch("/api/Delete-account", {
        method: "DELETE",
        ...defaultConfig(),
        body: JSON.stringify({
          username: user?.profile?.username,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete account");
      }
      if(response.ok){
        localStorage.removeItem("token");
        router.refresh()
      }

      router.push("/");
    } catch (err: any) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex p-4">
      <div className="w-full max-w-md p-6 rounded-md shadow-md space-y-6 bg-gray-800 border border-gray-700">
        {/* Update Username Section */}
        <form onSubmit={handleUsernameUpdate}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-100">Update Username</h2>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-100">
                  New Username
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9]+"
                  title="Only letters and numbers allowed"
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your new username"
                />
                <button
                  type="button"
                  onClick={checkUsernameAvailability}
                  disabled={isChecking || !username.trim() || username === user?.profile?.username}
                  className="px-3 py-2 text-sm cursor-pointer bg-blue-600 hover:bg-blue-500 rounded-md disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isChecking ? "Checking..." : "Check"}
                </button>
              </div>
              
              {isAvailable !== null && (
                <p className={`mt-2 text-sm ${
                  isAvailable ? "text-green-500" : "text-red-500"
                }`}>
                  {!isAvailable 
                    ? "Username is available!" 
                    : "Username is already taken"}
                </p>
              )}
            </div>

            {updateError && (
              <p className="text-red-500 text-sm">{updateError}</p>
            )}

            <button
              type="submit"
              disabled={isUpdating || username === user?.profile?.username || isAvailable === false || isAvailable === null}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update Username"}
            </button>
          </div>
        </form>

        {/* Delete Account Section */}
        <div className="space-y-4 pt-6 border-t border-gray-700">
          <h2 className="text-xl font-bold text-red-500">Delete Account</h2>
          <p className="text-gray-300">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {deleteError && (
            <p className="text-red-500 text-sm">{deleteError}</p>
          )}

          <button
            type="button"
            onClick={handleAccountDelete}
            disabled={isDeleting}
            className="w-full px-4 py-2 border border-red-600 text-red-500 font-semibold rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-700 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete Your Account"}
          </button>
        </div>
      </div>
    </div>
  );
}