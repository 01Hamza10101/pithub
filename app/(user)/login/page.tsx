'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'

import GitHubIconSvg from "@/app/components/icons/icons-github.svg"

interface FormData {
  userid: string
  password: string
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    userid: "",
    password: "",
  })
  const Router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();    
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        Router.push('/overview')
      } else {
        console.error("Sign-in failed:", data.error || response.statusText);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
  <div className="flex w-screen justify-center items-center h-screen">
    <div className="w-[340px] space-y-6">
      <div className="flex justify-center">
        {/* <GitHubIconSvg /> */}
      </div>

      <h1 className="text-center text-2xl font-semibold">Sign in to GitHub</h1>

      <div className="border rounded-md border-[#333] p-4 bg-[#33333338]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="userid" className="text-sm font-medium">
              Username or email address
            </label>
            <input
              id="userid"
              name="userid"
              type="text"
              value={formData.userid}
              onChange={handleChange}
              required
              className="w-full border border-[#333] rounded-md bg-black px-4 py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between ">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                href="/password_reset"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-[#333] rounded-md bg-black px-4 py-2"
            />
          </div>

          <button type="submit" className="w-full  bg-green-600 rounded-md hover:bg-green-700 text-white py-2">
            Sign in
          </button>
        </form>
      </div>

      {/* <div className="text-center">
        <button
          className="w-full border text-sm px-4 py-2"
          onClick={() => console.log("Passkey sign in")}
        >
          Sign in with a passkey
        </button>
      </div> */}

      <div className="border rounded-md p-4 border-[#333] text-sm text-center bg-[#33333338]">
        New to GitHub?{" "}
        <Link href="/signup" className="text-blue-600  hover:text-blue-800 hover:underline">
          Create an account
        </Link>
      </div>
    </div>
    </div>
  )
}
