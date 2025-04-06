'use client'

import Link from "next/link"
import { useState } from "react"
// import { button } from "@/components/ui/button"
// import { input } from "@/components/ui/input"
import  GitHubIcon from "@/app/components/icons/icons-github.svg";
import AccountVerifications from "../account_verifications/verify";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpForm, setOtpForm] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const response = await fetch('/api/auth/pass_reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,newPasswordRequest: false }),
      })
      const data = await response.json();
      if(response.ok) {
        if(data.sent){
          setOtpForm(true);
        }
        console.log("data:", data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if(!otpForm){
    return (
   <div className="w-screen h-screen flex justify-center items-center">
    <div className="w-[340px] space-y-6">
      {/* GitHub Logo */}
      <div className="flex justify-center">
        {/* <GitHubIcon /> */}
      </div>

      {/* Reset password heading */}
      <h1 className="text-center text-2xl font-semibold">Reset your password</h1>

      {/* Reset form */}
      <div className="border rounded-md bg-[#33333338]-50 border-[#333] p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <p className="text-sm">
              Enter your user account&apos;s verified email address and we will send you a
              password reset link.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full border bg-[#33333338] border-[#333] rounded-md px-4 py-2"
              aria-label="Email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Sending..." : "Confirm email"}
          </button>
        </form>
      </div>

      {/* Footer links */}
      {/* <footer className="text-xs text-center space-x-4 text-blue-600">
        <Link href="/terms" className="hover:text-blue-800 hover:underline">Terms</Link>
        <Link href="/privacy" className="hover:text-blue-800 hover:underline">Privacy</Link>
        <Link href="/docs" className="hover:text-blue-800 hover:underline">Docs</Link>
        <Link href="/support" className="hover:text-blue-800 hover:underline">Contact GitHub Support</Link>
        <Link href="#" className="hover:text-blue-800 hover:underline">Manage cookies</Link>
        <Link href="#" className="hover:text-blue-800 hover:underline">Do not share my personal information</Link>
      </footer> */}
    </div>
  </div> 
    )
  }else{
    return(<AccountVerifications email={email}/>)
  }
}

