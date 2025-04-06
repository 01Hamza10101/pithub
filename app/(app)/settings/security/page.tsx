"use client";

import React, { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Add your API call or update logic here
    alert("Password updated successfully!");
  };

  const InputField = ({
    label,
    name,
    type = "password",
    required = false,
    placeholder,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder: string;
  }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-100 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={(formData as any)[name]}
        onChange={handleChange}
        className="w-full max-w-xs px-3 py-2 bg-gray-900 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="flex p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-md shadow-md space-y-4"
      >
        {/* Old Password */}
        <InputField
          label="Old Password"
          name="oldPassword"
          required
          placeholder="Enter your old password"
        />

        {/* New Password */}
        <InputField
          label="New Password"
          name="newPassword"
          required
          placeholder="Enter your new password"
        />

        {/* Confirm Password */}
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          required
          placeholder="Confirm your new password"
        />

        {/* Update Password Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Password
        </button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
