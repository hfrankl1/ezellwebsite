import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'

/**
 * Booking API Route
 * 
 * This endpoint handles booking form submissions.
 * Currently, it logs the submission and returns a success response.
 * 
 * To integrate with an email service (like SendGrid or Postmark):
 * 1. Install the email service SDK
 * 2. Add your API key to .env.local
 * 3. Replace the console.log with actual email sending logic
 * 
 * Example with SendGrid:
 * ```typescript
 * import sgMail from '@sendgrid/mail'
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
 * 
 * await sgMail.send({
 *   to: process.env.BOOKINGS_EMAIL || siteConfig.primaryEmail,
 *   from: 'noreply@ezellfranklin.com',
 *   subject: `New ${data.type} Booking Inquiry`,
 *   html: formatBookingEmail(data),
 * })
 * ```
 */

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Log the booking submission
    // In production, you'd send an email here
    console.log('New booking inquiry:', {
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      ...(data.type === 'photography' && {
        sessionType: data.sessionType,
        date: data.date,
        location: data.location,
        referral: data.referral || 'Not provided',
        vision: data.vision,
      }),
      ...(data.type === 'dj' && {
        setType: data.setType,
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        eventLocation: data.eventLocation,
        venueType: data.venueType,
        djReferral: data.djReferral || 'Not provided',
        energy: data.energy,
      }),
    })

    // Get recipient email from environment variable or use default
    const recipientEmail = process.env.BOOKINGS_EMAIL || siteConfig.primaryEmail

    // TODO: Send email using your preferred email service
    // For now, we'll just log it
    console.log(`Booking inquiry should be sent to: ${recipientEmail}`)

    return NextResponse.json(
      { message: 'Booking inquiry received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking inquiry' },
      { status: 500 }
    )
  }
}

