"use client";

import React, { useState } from "react";
import Link from "next/link";

// ✅ Move this OUTSIDE the Page component
const InputField = ({
  label,
  name,
  type = "password",
  required = false,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500"
      placeholder={placeholder}
    />
  </div>
);

const defaultConfig = () => {
  const accessToken = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json" ,
      Authorization: `Bearer ${accessToken}`,
    },
  };
};


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const res = await fetch("/api/settings/update-password", {
        method: "POST",...defaultConfig(),
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-md shadow-md space-y-4"
      >
        <InputField
          label="Old Password"
          name="oldPassword"
          required
          placeholder="Enter your old password"
          value={formData.oldPassword}
          onChange={handleChange}
        />
        <InputField
          label="New Password"
          name="newPassword"
          required
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          required
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Password
        </button>
        <div className="text-center">
          <Link
            href="/password_reset"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
