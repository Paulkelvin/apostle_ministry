import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Check serviceTimes
const st = await client.fetch('*[_type == "serviceTimes"][0]')
console.log('\n=== serviceTimes ===')
console.log(JSON.stringify(st, null, 2))

// Check a sample post
const post = await client.fetch('*[_type == "post"][0]{_id, title, slug, publishedAt, "cats": categories[]->title}')
console.log('\n=== Sample post ===')
console.log(JSON.stringify(post, null, 2))
