# Email Waitlist Implementation

## ## Server Actions (`app/actions/waitlist.ts`)

This file contains server-side functions that handle the waitlist functionality:
- `joinWaitlist`: Validates email addresses, stores them in Redis, sends confirmation emails via Resend, and returns success/error messages
- `getWaitlistCount`: Retrieves the current number of emails in the waitlist from Redis

```
'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { joinWaitlist } from '../actions/waitlist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface WaitlistFormProps {
  onSuccess: (count: number) => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, null)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
        duration: 5000,
      })
      if (state.count) {
        onSuccess(state.count)
      }
      setEmail('')
    } else if (state?.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
        duration: 5000,
      })
    }
  }, [state, toast, onSuccess])

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData)
  }

  return (
    <form action={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          disabled={isPending} 
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Get Notified'
          )}
        </Button>
      </div>
    </form>
  )
}
```

## ## Email Template (`app/components/email-template.tsx`)

A React component that generates HTML for confirmation emails sent to users who join the waitlist. It creates a responsive, styled email with a personalized message including the user's email address.

```
interface EmailTemplateProps {
  email: string
}

export function EmailTemplate({ email }: EmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Our Waitlist</title>
      </head>
      <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; padding: 20px;">
        <div style="max-width: 560px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">Welcome to Our Waitlist!</h1>
          <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">
            Thank you for joining our waitlist. We've received your email address (${email}) and will keep you updated on our progress.
          </p>
          <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">
            We're working hard to create something amazing and can't wait to share it with you!
          </p>
          <p style="color: #374151; font-size: 16px; margin-bottom: 8px;">Best regards,</p>
          <p style="color: #111827; font-size: 16px; font-weight: 500;">The Team</p>
        </div>
      </body>
    </html>
  `
}
```

## ## Redis Client (`app/lib/redis.ts`)

Sets up and exports a Redis client using Upstash Redis, configured with environment variables for the REST URL and token. This client is used to store and retrieve waitlist data.

```
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})
```
 ## ### Component Explanations for Waitlist Signup Project

## Server Actions (`app/actions/waitlist.ts`)

This file contains server-side functions that handle the waitlist functionality:

- `joinWaitlist`: Validates email addresses, stores them in Redis, sends confirmation emails via Resend, and returns success/error messages
- `getWaitlistCount`: Retrieves the current number of emails in the waitlist from Redis


## Email Template (`app/components/email-template.tsx`)

A React component that generates HTML for confirmation emails sent to users who join the waitlist. It creates a responsive, styled email with a personalized message including the user's email address.

## Redis Client (`app/lib/redis.ts`)

Sets up and exports a Redis client using Upstash Redis, configured with environment variables for the REST URL and token. This client is used to store and retrieve waitlist data.

## Waitlist Form (`app/components/waitlist-form.tsx`)

A client-side form component that:

- Handles email input and submission
- Uses React's `useActionState` to manage form state and submission
- Shows loading state during submission
- Displays success/error toasts after submission
- Calls the `onSuccess` callback when a user successfully joins the waitlist

```
'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { joinWaitlist } from '../actions/waitlist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface WaitlistFormProps {
  onSuccess: (count: number) => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, null)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.message,
        duration: 5000,
      })
      if (state.count) {
        onSuccess(state.count)
      }
      setEmail('')
    } else if (state?.success === false) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
        duration: 5000,
      })
    }
  }, [state, toast, onSuccess])

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData)
  }

  return (
    <form action={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          disabled={isPending} 
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Get Notified'
          )}
        </Button>
      </div>
    </form>
  )
}
```

## ## Waitlist Signup (`app/components/waitlist-signup.tsx`)

The main container component that:

- Manages the waitlist count state
- Displays the headline, description, and call-to-action
- Renders the waitlist form
- Shows avatars and the number of people on the waitlist

```
"use client"

import { useState, useEffect } from "react"
import { getWaitlistCount } from "../actions/waitlist"
import { Avatar } from "./avatar"
import { SocialIcon } from "./social-icon"
import { WaitlistForm } from "./waitlist-form"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count + 100))
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count + 100)
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
            Revolutionising how {" "}
            <span className="bg-gradient-to-r from-[#5B68F6] to-[#5CE1E6] bg-clip-text text-transparent">
              Venture Capital
            </span>
            {" "}meets founders
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            We will save massive amounts of time for VCs while supplying them with the best founders in the industry.
          </p>
        </div>
        <div className="w-full">
          <WaitlistForm onSuccess={handleSuccess} />
        </div>
        <div>
          <div className="flex items-center justify-center mt-8">
            <div className="flex -space-x-2 mr-4">
              <Avatar initials="JD" index={0} />
              <Avatar initials="AS" index={1} />
              <Avatar initials="MK" index={2} />
            </div>
            <p className="text-white font-semibold">{waitlistCount}+ people on the waitlist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Main Page (`app/page.tsx`)

The root page component that:

- Renders the `WaitlistSignup` component
- Includes the `Toaster` component for displaying notifications
- Uses CSS-in-JS for styling the background pattern

```
"use client"

import { WaitlistSignup } from "./components/waitlist-signup"
import { Toaster } from "@/components/ui/toaster"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <WaitlistSignup />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(23 23 23)",
            color: "white",
            border: "1px solid rgb(63 63 70)",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      />
    </main>
  )
}
```

## ### Component Explanations for Waitlist Signup Project

## Server Actions (`app/actions/waitlist.ts`)

This file contains server-side functions that handle the waitlist functionality:

- `joinWaitlist`: Validates email addresses, stores them in Redis, sends confirmation emails via Resend, and returns success/error messages
- `getWaitlistCount`: Retrieves the current number of emails in the waitlist from Redis


## Email Template (`app/components/email-template.tsx`)

A React component that generates HTML for confirmation emails sent to users who join the waitlist. It creates a responsive, styled email with a personalized message including the user's email address.

## Redis Client (`app/lib/redis.ts`)

Sets up and exports a Redis client using Upstash Redis, configured with environment variables for the REST URL and token. This client is used to store and retrieve waitlist data.

## Waitlist Form (`app/components/waitlist-form.tsx`)

A client-side form component that:

- Handles email input and submission
- Uses React's `useActionState` to manage form state and submission
- Shows loading state during submission
- Displays success/error toasts after submission
- Calls the `onSuccess` callback when a user successfully joins the waitlist


## Avatar Component (`app/components/avatar.tsx`)

Creates circular avatars with initials and different background colors based on the index. Used to display sample users who have joined the waitlist.

## Waitlist Signup (`app/components/waitlist-signup.tsx`)

The main container component that:

- Manages the waitlist count state
- Displays the headline, description, and call-to-action
- Renders the waitlist form
- Shows avatars and the number of people on the waitlist
- Includes social media links at the bottom


## Social Icon (`app/components/social-icon.tsx`)

A reusable component for social media links that:

- Takes an icon, URL, and accessibility label as props
- Applies hover effects and styling
- Opens links in a new tab when clicked


## Main Page (`app/page.tsx`)

The root page component that:

- Sets up a gradient background with a grid pattern overlay
- Renders the `WaitlistSignup` component
- Includes the `Toaster` component for displaying notifications
- Uses CSS-in-JS for styling the background pattern

```
"use client"

import { WaitlistSignup } from "./components/waitlist-signup"
import { Toaster } from "@/components/ui/toaster"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <WaitlistSignup />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(23 23 23)",
            color: "white",
            border: "1px solid rgb(63 63 70)",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      />
    </main>
  )
}
```

## The `toast.tsx` component implements a notification system for the application using Radix UI's Toast primitives. Here's what it does:

### Toast Component Functionality

1. **Toast Notification System**: Creates a customizable notification system that displays temporary messages to users after actions like form submissions.
2. **Component Structure**:

1. `ToastProvider`: Manages the state and context for all toast notifications
2. `ToastViewport`: Defines where toasts appear on the screen (top-right corner by default)
3. `Toast`: The actual notification component with styling variants
4. `ToastAction`: Optional action button within a toast
5. `ToastClose`: Close button for dismissing toasts
6. `ToastTitle`: Title text for the toast
7. `ToastDescription`: Main content/message of the toast



3. **Styling and Animations**:

1. Uses class-variance-authority (cva) to create different toast variants (default and destructive)
2. Implements slide-in/slide-out animations when toasts appear and disappear
3. Supports swipe gestures for dismissing toasts on touch devices



4. **Usage in the Application**:

1. The `WaitlistForm` component uses toasts to show success and error messages after form submission
2. The main page includes a `Toaster` component (which uses these toast components) with custom styling for the dark theme

```
"use client"

import { WaitlistSignup } from "./components/waitlist-signup"
import { Toaster } from "@/components/ui/toaster"

const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <WaitlistSignup />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(23 23 23)",
            color: "white",
            border: "1px solid rgb(63 63 70)",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      />
    </main>
  )
}
```