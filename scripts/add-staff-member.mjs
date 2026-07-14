/**
 * One-off script: add/replace Pastor Kathy Denise McKoy, PhD as the
 * rank-2 staff member (replacing the "Jane Smith" placeholder seed data).
 *
 * Uploads her 5 provided photos as Sanity image assets, then
 * createOrReplace()s the existing rank-2 staff document so its _id
 * (and any references to it) stay stable.
 *
 * Run: SANITY_API_TOKEN=<your token> node scripts/add-staff-member.mjs
 *
 * Requires a Sanity API token with write access (sanity.io/manage →
 * your project → API → Tokens → Add API token → Editor permissions).
 * NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET fall back
 * to this project's known values if not set in your environment.
 */

import { createClient } from 'next-sanity'
import { createReadStream, existsSync } from 'fs'
import { randomUUID } from 'crypto'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN. Run as:\n   SANITY_API_TOKEN=<your token> node scripts/add-staff-member.mjs')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// The rank-2 placeholder document ("Jane Smith / Worship Pastor"),
// confirmed live in the dataset — reused so its _id stays stable.
const STAFF_DOC_ID = 'vA7m4lY7sG5bbTS60Cl5J1'

// Photos as uploaded to this session. Swap these paths if running
// against different files.
const UPLOAD_DIR = '/root/.claude/uploads/8ff27870-107d-593d-ab03-52a17e9c4d84'
const PRIMARY_PHOTO = `${UPLOAD_DIR}/910b6465-6b90b5512fad4256976e6ee13a8ef687.jpeg` // purple scarf, office
const GALLERY_PHOTOS = [
  `${UPLOAD_DIR}/d9294ec2-d6f3f4ee30d94f47a5341802cdb68d7c.jpeg`, // car selfie, natural light
  `${UPLOAD_DIR}/28bb69fc-1582f84cd8234d7fa5128eee160cbc54.jpeg`, // cardigan, black top
  `${UPLOAD_DIR}/f08b2324-e56eab00ec1544d58858b7b45e41a624.jpeg`, // colorful floral top
  `${UPLOAD_DIR}/60c78902-7aebe66a13a9436f97968f6aa80e0c5c.jpeg`, // clergy collar, formal portrait
]

for (const p of [PRIMARY_PHOTO, ...GALLERY_PHOTOS]) {
  if (!existsSync(p)) {
    console.error(`❌ Photo not found: ${p}`)
    process.exit(1)
  }
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
    'Dr. McKoy was born Kathy Denise Cousins, the seventh of eleven children of Thurman and Ada Cousins. She was born on Friday, June 13, 1958 in Welch, West Virginia. Dr. McKoy had a strict upbringing and she was a tomboy. She loved being outside and she liked playing sports of all kinds! Dr. McKoy was always curious as a child and she enjoyed going to school, reading and learning new things. She especially liked watching TV with her Dad and learning about football, basketball and baseball!'
  ),
  block(
    'Dr. McKoy got baptized at the age of seven at Mt. Carmel Baptist Church and she liked going to church. She would even go to prayer meetings with her Dad on Wednesday nights. Her Dad labeled her as a peculiar child! A label she didn’t quite understand until much later in her life!'
  ),
  block(
    'Dr. McKoy graduated from high school in 1976 and went on to study at Concord College (Athens, WV), Howard University (Washington, DC) and Sojourner Douglass College (Baltimore, MD). She later earned her Doctorate Degree in Emergency Management from Capella University in August 2010.'
  ),
  block(
    'She was employed with the federal government for over 30 years in Washington, DC, specifically the Department of Homeland Security (Federal Emergency Management Agency – FEMA); Federal Home Loan Bank Board and Federal Home Loan Mortgage Corporation. She retired from the federal government in 2018.'
  ),
  block(
    'She attended church at Canaan Baptist Church in Washington, DC and Abyssinia Baptist Church in Capital Heights, MD. She later joined Greater Saint John Cathedral in Upper Marlboro, Maryland and was a licensed minister and ordained as an Elder under Bishop Kevin B. Gresham, Sr. She taught Sunday School at Greater. She was involved in the Women’s Ministry and a member of the House of Elijah!'
  ),
  block(
    'Dr. McKoy and her husband, Jerry, have been married for 44 years. They have three children — two girls and one boy: Ebony/Tye Russell (Melbourne, Florida); Tameica/Khaleem Washington (Browns Summit, NC) and Jason/Andrea McKoy (Dallas, TX). They also have eight grandchildren: Makayla/Corey Dennison, TJ, Victoria, Lyric, Miche’, TeiAira, TaMiyah and Laila! And they have one great-grandson, Kia Dennison.'
  ),
  block(
    'The McKoys currently live in Greensboro, NC, and they worship with Restoring Life Family Community Center and attend Mt. Zion Baptist Church in Greensboro, NC.'
  ),
]

async function uploadImage(path) {
  const stream = createReadStream(path)
  const asset = await client.assets.upload('image', stream, { filename: path.split('/').pop() })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  console.log('📸 Uploading photos...')
  const primaryImage = await uploadImage(PRIMARY_PHOTO)
  console.log(`  ✅ Primary photo uploaded`)

  const gallery = []
  for (const path of GALLERY_PHOTOS) {
    gallery.push(await uploadImage(path))
    console.log(`  ✅ Gallery photo uploaded (${gallery.length}/${GALLERY_PHOTOS.length})`)
  }

  console.log('\n📝 Writing staff document...')
  const doc = await client.createOrReplace({
    _id: STAFF_DOC_ID,
    _type: 'staff',
    name: 'Kathy Denise McKoy, PhD',
    role: 'Pastor',
    slug: { _type: 'slug', current: 'kathy-denise-mckoy' },
    rank: 2,
    image: primaryImage,
    gallery,
    bio: 'Dr. Kathy Denise McKoy served over 30 years in federal emergency management before retiring in 2018. An ordained Elder and licensed minister, she and her husband Jerry now worship at Restoring Life Family Community Center.',
    fullBio,
  })

  console.log(`\n✅ Done. Document id: ${doc._id}`)
  console.log(`   View/edit in Studio: /studio/structure/staff;${doc._id}`)
  console.log(`   Live page once deployed: /about/leadership/kathy-denise-mckoy`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
