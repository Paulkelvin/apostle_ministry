import 'dotenv/config'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'j2qt3gmh',
  dataset: 'rlfcc',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Check both published and draft
const published = await client.fetch(`
  *[_id == "siteSettings"][0]{
    heroVideo,
    heroVideoFile,
    "heroVideoFileUrl": heroVideoFile.asset->url
  }
`)

const draft = await client.fetch(`
  *[_id == "drafts.siteSettings"][0]{
    heroVideo,
    heroVideoFile,
    "heroVideoFileUrl": heroVideoFile.asset->url
  }
`)

console.log("PUBLISHED:", JSON.stringify(published, null, 2))
console.log("DRAFT:", JSON.stringify(draft, null, 2))
