"use client"

import { useState, useEffect } from "react"
import { mockGetWaitlistCount } from "@/lib/mock-waitlist"
import { Avatar } from "./avatar"
import { WaitlistForm } from "./waitlist-form"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await mockGetWaitlistCount()
        setWaitlistCount(count + 100)
      } catch (error) {
        console.error('Error fetching waitlist count:', error)
        // Set a default count if there's an error
        setWaitlistCount(100)
      }
    }
    
    fetchCount()
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count + 100)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="w-full">
          <WaitlistForm onSuccess={handleSuccess} />
        </div>
        <div>
          <div className="flex items-center justify-center mt-4">
            <div className="flex -space-x-2 mr-4">
              <Avatar initials="JD" index={0} />
              <Avatar initials="AS" index={1} />
              <Avatar initials="MK" index={2} />
            </div>
            <p className="text-gray-600 font-semibold">{waitlistCount}+ people on the waitlist</p>
          </div>
        </div>
      </div>
    </div>
  )
} 