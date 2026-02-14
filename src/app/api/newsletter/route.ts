import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter subscription endpoint.
 * Stores emails in a simple JSON approach for now.
 * Can be swapped for Mailchimp/ConvertKit/Resend later.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // TODO: Integrate with your preferred email service
    // For now, log it and return success
    // In production, connect to Mailchimp, ConvertKit, Resend, etc.
    console.log(`Newsletter signup: ${email}`)

    return NextResponse.json(
      { message: 'Thanks for subscribing! You\'ll hear from us soon.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
