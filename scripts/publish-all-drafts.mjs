/**
 * Publish ALL draft documents in Sanity
 * 
 * Run: node scripts/publish-all-drafts.mjs
 */
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function publishAllDrafts() {
  console.log('🔍 Finding all draft documents...\n')

  // Fetch all drafts
  const drafts = await client.fetch(`*[_id in path("drafts.**")] { _id, _type, "title": coalesce(title, name, heroTitle, siteName, locationName, "Untitled") }`)

  if (drafts.length === 0) {
    console.log('✅ No drafts found — everything is already published!')
    return
  }

  console.log(`📋 Found ${drafts.length} drafts to publish:\n`)

  let published = 0
  let failed = 0

  for (const draft of drafts) {
    const publishedId = draft._id.replace('drafts.', '')
    try {
      // Get the full draft document
      const doc = await client.fetch(`*[_id == $id][0]`, { id: draft._id })
      if (!doc) continue

      // Remove internal fields
      const { _id, _rev, _createdAt, _updatedAt, ...fields } = doc

      // Create or replace the published version
      await client.createOrReplace({
        ...fields,
        _id: publishedId,
      })

      // Delete the draft
      await client.delete(draft._id)

      console.log(`  ✅ ${draft._type}: ${draft.title}`)
      published++
    } catch (err) {
      console.log(`  ❌ ${draft._type}: ${draft.title} — ${err.message}`)
      failed++
    }
  }

  console.log(`\n🎉 Done! Published: ${published}, Failed: ${failed}`)
}

publishAllDrafts().catch(console.error)
