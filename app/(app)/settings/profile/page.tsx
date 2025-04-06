"use client";

import React, { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    bio?: string;
    pronouns?: string;
    socialAccounts: string[];
  }>({
    name: "0101Hanzla",
    email: "",
    bio: "",
    pronouns: "Male",
    socialAccounts: ["", "", "", ""], // Initialize with 4 empty links
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("socialAccounts")) {
      const index = parseInt(name.split("_")[1], 10);
      setFormData((prev) => {
        const updatedAccounts = [...prev.socialAccounts];
        updatedAccounts[index] = value;
        return { ...prev, socialAccounts: updatedAccounts };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const Input = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder: string;
  }) => (
    <div>
      <div className="flex items-center space-x-2">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={(formData as any)[name]}
        onChange={handleChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-6 p-4">
      {/* Form Section */}
      <div className="flex-1 w-full max-w-lg space-y-6">
        <Input
          label="Name"
          name="name"
          required
          placeholder="Enter your name"
        />
        <Input
          label="Email"
          name="email"
          required
          placeholder="Enter your email"
        />
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            Bio <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500"
            placeholder="A short description of yourself"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="pronouns" className="block text-sm font-medium">
            Pronouns <span className="text-gray-500">(optional)</span>
          </label>
          <select
            id="pronouns"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="socialAccounts" className="block text-sm font-medium">
            Social Accounts
          </label>
          {formData.socialAccounts.map((account, index) => (
            <input
              key={index}
              type="text"
              id={`socialAccount_${index}`}
              name={`socialAccounts_${index}`}
              value={account}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500"
              placeholder={`Link to social profile #${index + 1}`}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Update Profile
        </button>
      </div>

      {/* Image Section */}
      <div className="w-32 h-32 lg:w-60 lg:h-60 bg-green-600 rounded-full"></div>
    </div>
  );
}
