import { NextRequest, NextResponse } from 'next/server'

const AUDIENCEFUL_ENDPOINT = 'https://app.audienceful.com/api/subscribe/kDVh5t65xN9xi6rSxUMwWC/'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create FormData for Audienceful
    const formData = new FormData()
    formData.append('email', email)

    // Forward request to Audienceful
    const response = await fetch(AUDIENCEFUL_ENDPOINT, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Audienceful API error:', response.status, errorText)
      return NextResponse.json(
        { success: false, error: 'Subscription failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Subscribe API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

