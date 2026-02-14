import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

const posts = await client.fetch('*[_type == "post"]{_id, title, mainImage}')
console.log('\n=== Blog posts mainImage data ===\n')
for (const p of posts) {
  console.log(`"${p.title}":`)
  console.log('  mainImage:', JSON.stringify(p.mainImage, null, 4))
  if (p.mainImage?.asset) {
    try {
      const url = builder.image(p.mainImage).url()
      console.log('  Generated URL:', url)
    } catch (e) {
      console.log('  URL generation FAILED:', e.message)
    }
  } else {
    console.log('  ⚠️ NO asset reference!')
  }
  console.log()
}
