import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, text, postId } = body

    if (!name || !email || !text || !postId) {
      return NextResponse.json(
        { error: 'Name, email, comment text, and post ID are all required.' },
        { status: 400 }
      )
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be under 1000 characters.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const comment = await writeClient.create({
      _type: 'comment',
      name,
      email,
      text,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      approved: false,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Comment submitted! It will appear once approved.', id: comment._id },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit comment. Please try again.' },
      { status: 500 }
    )
  }
}
