/**
 * One-off script: replace the placeholder `?v=example1..5` videoUrls on
 * the 5 seeded sermon documents with real, free, publicly embeddable
 * YouTube sermon videos (verified via YouTube's oEmbed API), and set a
 * matching thumbnail on each so the sermon cards render real artwork
 * instead of the initial-letter placeholder.
 *
 * Run: SANITY_API_TOKEN=<your token> node scripts/set-sermon-videos.mjs
 */

import { createClient } from 'next-sanity'
import { createReadStream, existsSync } from 'fs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN. Run as:\n   SANITY_API_TOKEN=<your token> node scripts/set-sermon-videos.mjs')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const THUMB_DIR = '/tmp/claude-0/-home-user-apostle-ministry/8ff27870-107d-593d-ab03-52a17e9c4d84/scratchpad/sermon-thumbs'

const sermons = [
  { docId: 'sermon-1', title: 'Walking by Faith, Not by Sight', videoId: '-oymV5Q1GsY', thumb: 's1.jpg' },
  { docId: 'sermon-2', title: 'The Power of Prayer', videoId: '2gTklyas55I', thumb: 's2.jpg' },
  { docId: 'sermon-3', title: 'Finding Rest in the Storm', videoId: 'D9Eqxxy310o', thumb: 's3.jpg' },
  { docId: 'sermon-4', title: 'Love Your Neighbor', videoId: '6B4qQTqOAk4', thumb: 's4.jpg' },
  { docId: 'sermon-5', title: 'Breaking Free from Fear', videoId: '0Kn9BTbPwbk', thumb: 's5.jpg' },
]

async function uploadImage(path) {
  const stream = createReadStream(path)
  const asset = await client.assets.upload('image', stream, { filename: path.split('/').pop() })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  for (const s of sermons) {
    const thumbPath = `${THUMB_DIR}/${s.thumb}`
    if (!existsSync(thumbPath)) {
      console.error(`❌ Missing thumbnail for ${s.title}: ${thumbPath}`)
      continue
    }
    console.log(`📹 Updating "${s.title}"...`)
    const thumbnail = await uploadImage(thumbPath)
    await client
      .patch(s.docId)
      .set({
        videoUrl: `https://www.youtube.com/watch?v=${s.videoId}`,
        thumbnail,
      })
      .commit()
    console.log(`  ✅ ${s.title} updated`)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
