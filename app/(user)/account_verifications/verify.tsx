'use client'

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmCodePage({email,type}:any) {
  const [code, setCode] = useState(['', '', '', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const Router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input if value is entered
      if (value !== '' && index < 7) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (/^\d{8}$/.test(pastedText)) { // Ensure only 8 numeric characters
      const newCode = pastedText.split('')
      setCode(newCode)

      // Automatically fill inputs and move focus to the last input
      newCode.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit
        }
      })
      inputRefs.current[7]?.focus() // Focus on the last input
    } else {
      console.warn('Invalid paste: Only 8 numeric characters are allowed.')
    }
  }
  async function Signup(fullCode:string) {
    try {
      fetch(`/api/auth/check-signup-otp?otp=${fullCode}&email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            Router.push('/overview')
          }
        })
        .catch((error) => {
          console.error('Error parsing JSON:', error)
        })
    } catch (error) {
      console.error('Error with the fetch request:', error)
    }
  }

  async function Pass_reset(fullCode:string) {
    console.log("fullCode Pass_reset:", fullCode)
    try {
      fetch(`/api/auth/pass_reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,code:fullCode,newPasswordRequest: true }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            console.log("working data.ok")
          }
        })
        .catch((error) => {
          console.error('Error parsing JSON:', error)
        })
    } catch (error) {
      console.error('Error with the fetch request:', error)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    console.log('Submitted code:', fullCode)
    
    type == "signup" ? Signup(fullCode) : Pass_reset(fullCode)

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#0a0a0a] p-8 rounded-lg shadow-md border border-[#333]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Confirm Your Address</h1>
        <p className="text-gray-600 mb-4 text-center">
          Please enter the 8-digit code sent to your email address.
        </p>
        <p className="text-gray-400 text-center mb-6">
          Time remaining: <span className="text-white">{formatTime(timeLeft)}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-10 h-12 border-2 bg-black border-[#333] mx-1 rounded-md text-center text-lg font-semibold focus:border-blue-500 focus:outline-none ${
                  timeLeft === 0 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''
                }`}
                disabled={timeLeft === 0}
                required
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md border border-[#333] transition-all duration-200 ease-in-out hover:bg-[#33333336] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={timeLeft === 0}
          >
            Confirm code
          </button>
        </form>
      </div>
    </div>
  )
}
