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

const posts = await client.fetch('*[_type == "post"]{_id, title, "authorName": author->name}')
console.log('\n=== Posts and Authors ===')
console.log(JSON.stringify(posts, null, 2))

const staff = await client.fetch('*[_type == "staff"]{_id, name, role}')
console.log('\n=== Staff ===')
console.log(JSON.stringify(staff, null, 2))
