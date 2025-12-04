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
  if (data.phone) {
    lines.push(`Phone: ${data.phone}`)
  }
  lines.push('')
  
  // Booking type specific fields
  if (data.type === 'photography') {
    lines.push('PHOTOGRAPHY BOOKING DETAILS')
    lines.push('-'.repeat(50))
    if (data.sessionType) {
      lines.push(`Session Type: ${data.sessionType}`)
    }
    if (data.date) {
      lines.push(`Desired Date: ${data.date}`)
    }
    if (data.location) {
      lines.push(`Location: ${data.location}`)
    }
    if (data.referral) {
      lines.push(`How they heard about you: ${data.referral}`)
    }
    if (data.vision) {
      lines.push('')
      lines.push('VISION/MESSAGE:')
      lines.push(data.vision)
    }
  } else if (data.type === 'dj') {
    lines.push('DJ BOOKING DETAILS')
    lines.push('-'.repeat(50))
    if (data.setType) {
      lines.push(`Set Type: ${data.setType}`)
    }
    if (data.eventDate) {
      lines.push(`Event Date: ${data.eventDate}`)
    }
    if (data.eventTime) {
      lines.push(`Event Time: ${data.eventTime}`)
    }
    if (data.eventLocation) {
      lines.push(`Event Location: ${data.eventLocation}`)
    }
    if (data.venueType) {
      lines.push(`Venue Type: ${data.venueType}`)
    }
    if (data.djReferral) {
      lines.push(`How they heard about you: ${data.djReferral}`)
    }
    if (data.energy) {
      lines.push('')
      lines.push('ENERGY/VIBE REQUESTED:')
      lines.push(data.energy)
    }
  }
  
  lines.push('')
  lines.push('='.repeat(50))
  lines.push(`Submitted: ${new Date().toLocaleString()}`)
  
  return lines.join('\n')
}

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

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate message/vision based on booking type
    if (data.type === 'photography' && !data.vision) {
      return NextResponse.json(
        { success: false, error: 'Please describe your vision for the session' },
        { status: 400 }
      )
    }

    if (data.type === 'dj' && !data.energy) {
      return NextResponse.json(
        { success: false, error: 'Please describe the energy you\'re looking for' },
        { status: 400 }
      )
    }

    // Check email configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.BOOKINGS_EMAIL) {
      console.error('Email configuration is missing. Required env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKINGS_EMAIL')
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
    const bookingType = data.type === 'photography' 
      ? (data.sessionType || 'Photography')
      : (data.setType || 'DJ Set')
    
    const subject = `New booking inquiry from ${data.name} – ${bookingType}`

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER!,
        to: process.env.BOOKINGS_EMAIL!,
        subject: subject,
        text: emailText,
        replyTo: data.email, // Allow direct reply to the customer
      })

      console.log(`Booking inquiry email sent successfully to ${process.env.BOOKINGS_EMAIL}`)
      
      return NextResponse.json(
        { success: true },
        { status: 200 }
      )
    } catch (emailError: any) {
      console.error('Failed to send email:', emailError)
      return NextResponse.json(
        { success: false, error: 'Failed to send email.' },
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
