/**
 * One-off script: patch the `website` field onto Tiffanylynette A.
 * May-Byrd's existing staff document, so the "Visit Website" button on
 * her bio page has something to render. Set to a same-page anchor for
 * now — it doesn't navigate anywhere until she provides a real URL,
 * which can then be swapped in directly via Sanity Studio (Staff &
 * Leadership -> her entry -> Website), no code changes needed.
 *
 * Run: SANITY_API_TOKEN=<your token> node scripts/set-tiffanylynette-website.mjs
 */

import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN. Run as:\n   SANITY_API_TOKEN=<your token> node scripts/set-tiffanylynette-website.mjs')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const STAFF_DOC_ID = 'JAaCSQAmvx03jDTTJw2q3T'

async function main() {
  const doc = await client.patch(STAFF_DOC_ID).set({ website: '#' }).commit()
  console.log(`✅ Done. Document id: ${doc._id}`)
  console.log(`   View/edit in Studio: /studio/structure/staff;${doc._id}`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
