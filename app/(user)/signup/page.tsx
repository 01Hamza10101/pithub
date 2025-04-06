'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import Account_Verify from "../account_verifications/verify";

interface FormData {
  email: string
  password: string
  username: string
}

interface FormErrors {
  email?: string
  password?: string
  username?: string
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isUnique, setIsUnique] = useState<boolean | null>(true)
  const [checking, setChecking] = useState(false)
  const [isverify, setIsverify] = useState<boolean>(false);
  const Router = useRouter();
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 15) {
      newErrors.password = "Password must be at least 15 characters"
    } else if (!/(?=.*[a-z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must include at least one number and lowercase letter"
    }

    if (!formData.username) {
      newErrors.username = "Username is required"
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.username)) {
      newErrors.username = "Username may only contain alphanumeric characters or single hyphens"
    } else if (/^-|-$/.test(formData.username)) {
      newErrors.username = "Username cannot begin or end with a hyphen"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      Signup()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "username") {
      setIsUnique(null) // Reset uniqueness state when username changes
    }
  }

  const checkUsernameAvailability = async () => {
    setChecking(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if(formData.username === "") return;
      const response = await fetch(`/api/auth/check-username?username=${formData.username}`, {method: 'GET',headers: {'Content-Type': 'application/json'}})
      const {isUnique} = await response.json();
      setIsUnique(isUnique)
    } finally {
      setChecking(false)
    }
  }
  
  //api
  async function Signup() {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        console.log("Success:", data)
        setIsverify(true);
        // Router.push('/account_verifications')
      } else {
        console.error("Signup failed:", data)
      }
    } catch (error) {
      console.error("Error occurred during signup:", error)
    }
  }
  
  if(isverify){
     return <Account_Verify email={formData.email} type={"signup"}/>
  }else{
     return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-sm space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sign up to GitHub</h2>
          <div className="text-sm flex flex-col">
            <span>
              Already have an account?{" "}
            </span>
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in →
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              Password should be at least 15 characters OR at least 8 characters including a
              number and a lowercase letter
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border rounded-md shadow-sm bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Choose a username"
              />
              <button
                type="button"
                onClick={checkUsernameAvailability}
                disabled={checking}
                className="px-3 py-2 text-sm cursor-pointer bg-blue-600 hover:bg-blue-500 rounded-md disabled:bg-gray-900 disabled:text-gray-500"
              >
                {checking ? "Checking..." : "Check Availability"}
              </button>
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
            {isUnique !== null && (
              <p
                className={`text-sm ${
                  isUnique ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isUnique ? "Username is available" : "Username is taken"}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Username may only contain alphanumeric characters or single hyphens, and cannot
              begin or end with a hyphen
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gray-900 hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Continue
          </button>

          <p className="text-xs text-gray-500">
            By creating an account, you agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
            . For more information about GitHub's privacy practices, see the{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              GitHub Privacy Statement
            </Link>
            . We'll occasionally send you account-related emails.
          </p>
        </form>
      </div>
    </div>
     )
  }
}
