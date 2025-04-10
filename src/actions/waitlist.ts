'use server'

import { z } from 'zod'
import { redis } from '../lib/redis'
import { Resend } from 'resend'
import { EmailTemplate } from '../components/email-template'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

const emailSchema = z.string().email('Please enter a valid email address')

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string
  
  try {
    // Validate email
    const validatedEmail = emailSchema.parse(email)
    
    // Check if email already exists in waitlist
    const exists = await redis.sismember('waitlist', validatedEmail)
    
    if (exists) {
      return {
        success: false,
        message: 'This email is already on our waitlist.',
      }
    }
    
    // Add email to waitlist
    await redis.sadd('waitlist', validatedEmail)
    
    // Get current count
    const count = await redis.scard('waitlist')
    
    // Send confirmation email
    await resend.emails.send({
      from: 'EarlySignal <noreply@earlysignal.com>',
      to: validatedEmail,
      subject: 'Welcome to EarlySignal Waitlist',
      html: EmailTemplate({ email: validatedEmail }),
    })
    
    return {
      success: true,
      message: 'Thank you for joining our waitlist! We\'ve sent a confirmation email.',
      count,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }
    
    console.error('Waitlist error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}

export async function getWaitlistCount() {
  try {
    const count = await redis.scard('waitlist')
    return count
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  }
} 