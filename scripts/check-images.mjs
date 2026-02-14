import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Check mainImage on all posts - resolve the asset URL
const posts = await client.fetch('*[_type == "post"]{_id, title, "imageUrl": mainImage.asset->url, "imageRef": mainImage.asset._ref}')
for (const p of posts) {
  console.log(`\n"${p.title}"`)
  console.log('  imageRef:', p.imageRef)
  console.log('  imageUrl:', p.imageUrl || '*** MISSING - asset does not exist ***')
}

// Also count image assets
const assetCount = await client.fetch('count(*[_type == "sanity.imageAsset"])')
console.log(`\nTotal image assets in dataset: ${assetCount}`)
