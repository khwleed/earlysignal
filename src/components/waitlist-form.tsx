'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { mockJoinWaitlist, mockGetWaitlistCount } from '@/lib/mock-waitlist'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

interface WaitlistFormProps {
  onSuccess?: (count: number) => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setErrorMessage('Please enter your email address')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await mockJoinWaitlist(email)
      setStatus('success')
      setEmail('')
      toast({
        title: 'Success!',
        description: 'You have been added to the waitlist.',
      })
      
      // Call onSuccess with the current count if provided
      if (onSuccess) {
        // Get the current count from the mock service
        const count = await mockGetWaitlistCount()
        onSuccess(count)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status === 'loading'}
        />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Joining...
          </span>
        ) : (
          'Join Waitlist'
        )}
      </button>
    </form>
  )
} 