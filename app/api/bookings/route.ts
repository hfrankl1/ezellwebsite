import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteConfig } from '@/config/site'

/**
 * Booking API Route
 * 
 * Handles booking form submissions and sends emails via Nodemailer.
 * 
 * Environment variables required:
 * - BOOKINGS_EMAIL: Destination email address
 * - SMTP_USER: Gmail/Workspace login email
 * - SMTP_PASS: Google App Password
 * - SMTP_HOST: SMTP server host (e.g., smtp.gmail.com)
 * - SMTP_PORT: SMTP server port (e.g., 465)
 */

/**
 * Formats booking data into a readable plain-text email
 */
function formatBookingEmail(data: any): string {
  const lines: string[] = []
  
  lines.push('NEW BOOKING INQUIRY')
  lines.push('='.repeat(50))
  lines.push('')
  
  // Basic contact info
  lines.push('CONTACT INFORMATION')
  lines.push('-'.repeat(50))
  lines.push(`Name: ${data.name}`)
  lines.push(`Email: ${data.email}`)
  lines.push('')
  
  // Booking details
  lines.push('BOOKING DETAILS')
  lines.push('-'.repeat(50))
  if (data.lookingFor) {
    lines.push(`What they're looking for: ${data.lookingFor}`)
  }
  if (data.dateTimeframe) {
    lines.push(`Preferred date/timeframe: ${data.dateTimeframe}`)
  }
  if (data.budget) {
    lines.push(`Budget: ${data.budget}`)
  }
  if (data.referral) {
    lines.push(`How they found this work: ${data.referral}`)
  }
  if (data.vibe) {
    lines.push('')
    lines.push('VIBE/MESSAGE:')
    lines.push(data.vibe)
  }
  
  lines.push('')
  lines.push('='.repeat(50))
  lines.push(`Submitted: ${new Date().toLocaleString()}`)
  
  return lines.join('\n')
}

/*
 * Boilerplate booking reply email template for manual or automated use:
 * 
 * Subject: Thanks for reaching out about photos/sounds
 * 
 * Hi [Name],
 * 
 * Appreciate you reaching out and sharing what you're planning.
 * 
 * I've received your note about:
 * - Type: [Photo session / DJ set / Both]
 * - Timing: [Their date or timeframe, if provided]
 * - Vibe: [Short paraphrase or paste from their message]
 * 
 * I'll review the details and follow up with:
 * - A few options based on what you shared
 * - Rough pricing and timing
 * - Any questions or ideas to help shape the session or set
 * 
 * If there's anything you didn't mention that might be helpful—references, links, or specific shots/songs you have in mind—feel free to reply to this email and add it.
 * 
 * Talk soon,
 * 
 * Ezell
 */

/**
 * Creates and returns a Nodemailer transporter
 */
function createTransporter() {
  // Validate required environment variables
  const requiredEnvVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    BOOKINGS_EMAIL: process.env.BOOKINGS_EMAIL,
  }
  
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log received data for debugging (without sensitive info)
    console.log('Received booking inquiry:', {
      type: data.type,
      name: data.name,
      email: data.email,
      hasPhone: !!data.phone,
    })

    // Validate required fields
    if (!data.name || !data.email) {
      console.error('Validation failed: Missing name or email')
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (!data.lookingFor) {
      console.error('Validation failed: Missing lookingFor')
      return NextResponse.json(
        { success: false, error: 'Please select what you\'re looking for' },
        { status: 400 }
      )
    }

    if (!data.vibe) {
      console.error('Validation failed: Missing vibe')
      return NextResponse.json(
        { success: false, error: 'Please tell us about the vibe' },
        { status: 400 }
      )
    }

    // Check email configuration
    const missingEnvVars = []
    if (!process.env.SMTP_HOST) missingEnvVars.push('SMTP_HOST')
    if (!process.env.SMTP_PORT) missingEnvVars.push('SMTP_PORT')
    if (!process.env.SMTP_USER) missingEnvVars.push('SMTP_USER')
    if (!process.env.SMTP_PASS) missingEnvVars.push('SMTP_PASS')
    if (!process.env.BOOKINGS_EMAIL) missingEnvVars.push('BOOKINGS_EMAIL')
    
    if (missingEnvVars.length > 0) {
      console.error(`Email configuration is missing. Missing env vars: ${missingEnvVars.join(', ')}`)
      return NextResponse.json(
        { success: false, error: 'Email configuration is missing.' },
        { status: 500 }
      )
    }

    // Create transporter
    let transporter
    try {
      transporter = createTransporter()
    } catch (error: any) {
      console.error('Failed to create email transporter:', error.message)
      return NextResponse.json(
        { success: false, error: 'Email configuration is missing.' },
        { status: 500 }
      )
    }

    // Format email content
    const emailText = formatBookingEmail(data)
    
    // Determine booking type for subject line
    const bookingType = data.lookingFor || 'Booking Inquiry'
    
    const subject = `New booking inquiry from ${data.name} – ${bookingType}`

    // Send email
    try {
      const mailOptions = {
        from: process.env.SMTP_USER!,
        to: process.env.BOOKINGS_EMAIL!,
        subject: subject,
        text: emailText,
        replyTo: data.email, // Allow direct reply to the customer
      }
      
      console.log('Attempting to send email...', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      })
      
      const info = await transporter.sendMail(mailOptions)
      
      console.log('Email sent successfully:', {
        messageId: info.messageId,
        response: info.response,
      })
      
      return NextResponse.json(
        { success: true },
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    } catch (emailError: any) {
      console.error('Failed to send email. Error details:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode,
      })
      
      // Provide more specific error message if possible
      let errorMessage = 'Failed to send email.'
      if (emailError.code === 'EAUTH') {
        errorMessage = 'Email authentication failed. Please check SMTP credentials.'
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage = 'Could not connect to email server. Please check SMTP settings.'
      } else if (emailError.message) {
        errorMessage = `Email error: ${emailError.message}`
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process booking inquiry' },
      { status: 500 }
    )
  }
}
