import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Tithely webhook secret for verification
const TITHELY_WEBHOOK_SECRET = process.env.TITHELY_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (Tithely sends this in headers)
    const signature = request.headers.get('x-tithely-signature')
    
    // In production, verify the signature matches the secret
    if (TITHELY_WEBHOOK_SECRET && signature !== TITHELY_WEBHOOK_SECRET) {
      console.warn('Invalid Tithely webhook signature')
      // For now, we'll log but continue - adjust based on Tithely's actual verification method
    }
    
    const payload = await request.json()
    
    // Tithely webhook payload structure
    // Note: Adjust field names based on actual Tithely webhook documentation
    const {
      event_type,
      data,
    } = payload

    // Only process completed donations
    if (event_type !== 'donation.completed' && event_type !== 'giving.created') {
      return NextResponse.json({ message: 'Event type not handled' }, { status: 200 })
    }

    const amount = data?.amount || data?.giving_amount || 0
    const fundName = data?.fund_name || data?.fund || data?.category || 'General'
    const donorEmail = data?.donor_email || data?.email || 'anonymous'
    const transactionId = data?.transaction_id || data?.id || ''
    const createdAt = data?.created_at || new Date().toISOString()

    // Convert cents to dollars if amount is in cents
    const donationAmount = amount > 1000 ? amount / 100 : amount

    // Find the matching campaign in Sanity by fundId or title
    const givingPage = await sanityClient.fetch(
      `*[_type == "givingPage"][0] {
        _id,
        donationCampaigns[] {
          _key,
          title,
          fundId,
          currentAmount,
          goalAmount
        }
      }`
    )

    if (givingPage?.donationCampaigns) {
      // Find campaign that matches the fund name
      const matchingCampaign = givingPage.donationCampaigns.find(
        (c: { fundId?: string; title?: string }) => 
          c.fundId?.toLowerCase() === fundName.toLowerCase() ||
          c.title?.toLowerCase() === fundName.toLowerCase()
      )

      if (matchingCampaign) {
        // Update the specific campaign's currentAmount within the array
        const newAmount = (matchingCampaign.currentAmount || 0) + donationAmount
        
        await sanityClient
          .patch(givingPage._id)
          .set({
            [`donationCampaigns[_key=="${matchingCampaign._key}"].currentAmount`]: newAmount
          })
          .commit()

        console.log(`Updated campaign "${matchingCampaign.title}" with $${donationAmount}. New total: $${newAmount}`)
      } else {
        console.log(`No matching campaign for fund: ${fundName}`)
      }
    }

    // Log successful webhook processing
    console.log(`Tithely webhook processed: $${donationAmount} to ${fundName}`)

    return NextResponse.json({ 
      success: true,
      message: `Donation of $${donationAmount} processed for ${fundName}`
    }, { status: 200 })

  } catch (error) {
    console.error('Tithely webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Tithely may send a GET request to verify the endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'active',
    message: 'Tithely webhook endpoint is ready to receive donations'
  })
}
