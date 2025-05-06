"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ProfileSvg from "@/public/Profile.svg";
import PencilSvg from "@/app/components/icons/icon-pen.svg";
import { UpdateProfile } from "@/app/ReduxToolkit/ReduxSlice/User.Slice";

interface ProfileFormData {
  name: string;
  email: string;
  bio?: string;
  pronouns?: "Male" | "Female";
  socialAccounts: string[];
}

interface SocialInputProps {
  label: string;
  name: keyof ProfileFormData;
  type?: string;
  required?: boolean;
  value:string;
  placeholder: string;
  disabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}
 const Input = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
    value,
    disabled = false,
    handleChange
  }: SocialInputProps) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
);

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    bio: "",
    pronouns: "Male",
    socialAccounts: ["", "", "", ""],
  });
  const [isSubmited,setIsSubmited] = useState(false);
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.profile.name || "",
        email: user.profile.email || "",
        bio: user.profile.bio || "",
        pronouns: user.profile.pronouns || "Male",
        socialAccounts: user.activity.socialLinks?.length === 4 
          ? user.activity.socialLinks 
          : [...(user.activity.socialLinks || []), ...Array(4).fill("")].slice(0, 4)
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.startsWith("socialAccounts")) {
      const index = parseInt(name.split("_")[1], 10);
      setFormData(prev => ({
        ...prev,
        socialAccounts: prev.socialAccounts.map((account, i) => 
          i === index ? value : account
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateSocialLinks = (links: string[]): boolean => {
    return links.every(link => {
      if (!link.trim()) return true;
      try {
        new URL(link);
        return true;
      } catch {
        return false;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(isSubmited) return
    setIsSubmited(true);
    if (!validateSocialLinks(formData.socialAccounts)) {
      alert("Please enter valid URLs for social links");
      return;
    }

    const transformedData = {
      profile: {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        pronouns: formData.pronouns
      },
      activity: {
        socialLinks: formData.socialAccounts.filter(link => link.trim() !== "")
      }
    };

    try {
      await dispatch(UpdateProfile(transformedData)).unwrap().then((data)=>{
        setIsSubmited(false)
      })
      // alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
      setIsSubmited(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        await dispatch(UploadAvatar(formData));
        alert("Avatar updated successfully!");
      } catch (error) {
        console.error("Avatar upload failed:", error);
        alert("Failed to upload avatar");
      }
    }
  };

 

  return (
    <form onSubmit={handleSubmit} className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-6 p-4">
      {/* Form Section */}
      <div className="flex-1 w-full max-w-lg space-y-6">
        <Input
          label="Name"
          name="name"
          value={formData["name"]}
          required
          handleChange={handleChange}
          placeholder="Enter your name"
        />
        
        <Input
          label="Email"
          name="email"
          value={formData["email"]}
          handleChange={handleChange}
          disabled
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
            aria-label="Select pronouns"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Social Accounts
          </label>
          {formData.socialAccounts.map((account, index) => (
            <input
              key={index}
              type="url"
              id={`socialAccount_${index}`}
              name={`socialAccounts_${index}`}
              value={account}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 bg-gray-800 text-white focus:ring-blue-500 mb-2"
              placeholder={`Social link #${index + 1} (URL)`}
              pattern="https?://.+"
              title="Must be a valid http/https URL"
            />
          ))}
        </div>
        
        <button
          type="submit"
          disabled={isSubmited}
          className={`w-full px-4 py-2  bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${isSubmited ? 'cursor-not-allowed bg-gray-900' : ''}`}
        >
          Update Profile
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="relative group">
        <div className="w-32 h-32 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 border-gray-600">
          <Image 
            src={user?.profile?.url || ProfileSvg}
            alt="Profile"
            width={240}
            height={240}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* <label 
          htmlFor="avatarInput"
          className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
        >
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Image
            src={PencilSvg}
            alt="Edit profile"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </label> */}
      </div>
    </form>
  );
}