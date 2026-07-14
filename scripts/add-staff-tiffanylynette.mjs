/**
 * One-off script: add/replace Tiffanylynette A. May-Byrd as the rank-3
 * staff member (replacing the "Michael Johnson" placeholder seed data).
 *
 * Uploads her one provided photo (cropped to a headshot — the original
 * was a personal-brand promotional graphic with baked-in text/logo, not
 * a plain portrait) and createOrReplace()s the existing rank-3 staff
 * document so its _id (and any references to it) stay stable.
 *
 * No gallery photos yet — the `gallery` field already exists on the
 * staff schema and is simply left unset here; more photos can be added
 * any time later directly in Sanity Studio (Staff & Leadership -> her
 * entry -> Photo Gallery), no code changes needed.
 *
 * Run: SANITY_API_TOKEN=<your token> node scripts/add-staff-tiffanylynette.mjs
 */

import { createClient } from 'next-sanity'
import { createReadStream, existsSync } from 'fs'
import { randomUUID } from 'crypto'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN. Run as:\n   SANITY_API_TOKEN=<your token> node scripts/add-staff-tiffanylynette.mjs')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// The rank-3 placeholder document ("Michael Johnson / Outreach Pastor"),
// confirmed live in the dataset — reused so its _id stays stable.
const STAFF_DOC_ID = 'JAaCSQAmvx03jDTTJw2q3T'

// Cropped headshot (face/shoulders only, text/logo removed) produced
// from the original promotional graphic uploaded to this session.
const PRIMARY_PHOTO = '/tmp/claude-0/-home-user-apostle-ministry/8ff27870-107d-593d-ab03-52a17e9c4d84/scratchpad/crop/tiffanylynette-attempt2.jpg'

if (!existsSync(PRIMARY_PHOTO)) {
  console.error(`❌ Photo not found: ${PRIMARY_PHOTO}`)
  process.exit(1)
}

function block(text) {
  return {
    _type: 'block',
    _key: randomUUID(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomUUID(), text, marks: [] }],
    markDefs: [],
  }
}

const fullBio = [
  block(
    'Tiffanylynette A. May-Byrd serves Restoring Life in a strategic administrative and ministry leadership capacity, helping transform vision into action through organizational excellence, resource development, and operational systems that strengthen the work of the Kingdom. With a professional background spanning executive administration, organizational strategy, financial stewardship, and leadership development, she is passionate about creating practical tools that equip people to thrive spiritually and personally. Whether coordinating ministry initiatives, developing discipleship resources, or supporting church leadership, her desire is to ensure that every system ultimately serves people and points them toward Christ.'
  ),
  block(
    'Beyond her work at Restoring Life, Tiffanylynette is the founder of Zenith Cornerstone, a ministry and educational initiative dedicated to biblical stewardship, discipleship, leadership development, and whole-life transformation. Through teaching, writing, workshops, and practical resources, Zenith Cornerstone equips individuals, families, ministries, and organizations to steward their faith, finances, purpose, and influence with wisdom and integrity. She is currently developing a growing library of Bible studies, financial stewardship resources, devotionals, courses, and publications designed to help people build lives that are firmly established on Christ—the true Cornerstone.'
  ),
]

async function uploadImage(path) {
  const stream = createReadStream(path)
  const asset = await client.assets.upload('image', stream, { filename: path.split('/').pop() })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  console.log('📸 Uploading photo...')
  const primaryImage = await uploadImage(PRIMARY_PHOTO)
  console.log('  ✅ Primary photo uploaded')

  console.log('\n📝 Writing staff document...')
  const doc = await client.createOrReplace({
    _id: STAFF_DOC_ID,
    _type: 'staff',
    name: 'Tiffanylynette A. May-Byrd',
    role: 'Director of Ministry Operations',
    slug: { _type: 'slug', current: 'tiffanylynette-may-byrd' },
    rank: 3,
    image: primaryImage,
    bio: "Tiffanylynette leads Restoring Life's administrative and organizational operations, turning vision into action through strategic planning, resource development, and leadership development. She is also the founder of Zenith Cornerstone, a ministry equipping people to steward their faith, finances, and purpose with wisdom.",
    fullBio,
  })

  console.log(`\n✅ Done. Document id: ${doc._id}`)
  console.log(`   View/edit in Studio: /studio/structure/staff;${doc._id}`)
  console.log(`   Live page once deployed: /about/leadership/tiffanylynette-may-byrd`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
