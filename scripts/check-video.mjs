import 'dotenv/config'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'j2qt3gmh',
  dataset: 'rlfcc',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Get ALL siteSettings documents (published, draft, versions)
const all = await client.fetch(`*[_type == "siteSettings"]`)
console.log("All siteSettings docs:", all.length)
for (const doc of all) {
  console.log(`\n=== ${doc._id} (updated: ${doc._updatedAt}) ===`)
  console.log("Has heroVideoFile:", !!doc.heroVideoFile)
  console.log("heroVideoFile:", JSON.stringify(doc.heroVideoFile))
  console.log("_system:", JSON.stringify(doc._system))
}

// Also try by ID directly
const byId = await client.fetch(`*[_id == "siteSettings"][0]`)
console.log("\n=== By _id 'siteSettings' ===")
console.log("Has heroVideoFile:", !!byId?.heroVideoFile)
console.log("Full keys:", Object.keys(byId || {}))
