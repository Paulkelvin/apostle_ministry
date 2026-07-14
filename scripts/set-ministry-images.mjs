/**
 * One-off script: upload free-licensed cover photos for the 4 existing
 * ministry documents and patch them onto `coverImage`. Sources (all
 * free-to-use, downloaded and re-optimized):
 *  - Worship Team: Wikimedia Commons, "O Praise Him.jpg" (CC-licensed, via Flickr)
 *  - Prayer Ministry: Wikimedia Commons, "Praying woman in a park (Unsplash).jpg"
 *  - Outreach: Wikimedia Commons, "Volunteers from the community lend a
 *    helping hand. (5913279092).jpg"
 *  - Hospitality: Wikimedia Commons, "Embracing Children (16796863757).jpg"
 *
 * Run: SANITY_API_TOKEN=<your token> node scripts/set-ministry-images.mjs
 */

import { createClient } from 'next-sanity'
import { createReadStream, existsSync } from 'fs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN. Run as:\n   SANITY_API_TOKEN=<your token> node scripts/set-ministry-images.mjs')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const IMAGE_DIR = '/tmp/claude-0/-home-user-apostle-ministry/8ff27870-107d-593d-ab03-52a17e9c4d84/scratchpad/dept-images/final'

const ministries = [
  { docId: '5HH9WLuCbMMokfecinFUGU', name: 'Outreach', file: 'outreach.jpg' },
  { docId: 'JAaCSQAmvx03jDTTJw2y2x', name: 'Worship Team', file: 'worship.jpg' },
  { docId: 'JAaCSQAmvx03jDTTJw30Xn', name: 'Prayer Ministry', file: 'prayer.jpg' },
  { docId: 'vA7m4lY7sG5bbTS60Cl7hb', name: 'Hospitality', file: 'hospitality.jpg' },
]

async function uploadImage(path) {
  const stream = createReadStream(path)
  const asset = await client.assets.upload('image', stream, { filename: path.split('/').pop() })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  for (const m of ministries) {
    const filePath = `${IMAGE_DIR}/${m.file}`
    if (!existsSync(filePath)) {
      console.error(`❌ Missing file for ${m.name}: ${filePath}`)
      continue
    }
    console.log(`📸 Uploading image for ${m.name}...`)
    const coverImage = await uploadImage(filePath)
    await client.patch(m.docId).set({ coverImage }).commit()
    console.log(`  ✅ ${m.name} updated`)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
