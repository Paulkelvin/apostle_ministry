import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function fixMissingKeys() {
  // Fetch all posts with their full data
  const posts = await client.fetch('*[_type == "post"]{_id, title, categories, body}')
  console.log(`Found ${posts.length} posts to check\n`)

  for (const post of posts) {
    let needsPatch = false
    const patches = {}

    // Fix categories array — add missing _key and _type
    if (post.categories && Array.isArray(post.categories)) {
      const fixedCats = post.categories.map((cat, i) => {
        if (!cat._key) {
          needsPatch = true
          return {
            ...cat,
            _key: randomUUID().slice(0, 8),
            _type: cat._type || 'reference',
          }
        }
        if (!cat._type) {
          needsPatch = true
          return { ...cat, _type: 'reference' }
        }
        return cat
      })
      if (needsPatch) {
        patches.categories = fixedCats
      }
    }

    // Fix body blocks — add missing _key
    if (post.body && Array.isArray(post.body)) {
      let bodyNeedsFix = false
      const fixedBody = post.body.map((block, i) => {
        if (!block._key) {
          bodyNeedsFix = true
          return { ...block, _key: randomUUID().slice(0, 8) }
        }
        // Also check children spans
        if (block.children && Array.isArray(block.children)) {
          let childrenFixed = false
          const fixedChildren = block.children.map((child, j) => {
            if (!child._key) {
              childrenFixed = true
              return { ...child, _key: randomUUID().slice(0, 8) }
            }
            return child
          })
          if (childrenFixed) {
            bodyNeedsFix = true
            return { ...block, children: fixedChildren }
          }
        }
        // Check markDefs
        if (block.markDefs && Array.isArray(block.markDefs)) {
          let markDefsFixed = false
          const fixedMarkDefs = block.markDefs.map((md) => {
            if (!md._key) {
              markDefsFixed = true
              return { ...md, _key: randomUUID().slice(0, 8) }
            }
            return md
          })
          if (markDefsFixed) {
            bodyNeedsFix = true
            return { ...block, markDefs: fixedMarkDefs }
          }
        }
        return block
      })
      if (bodyNeedsFix) {
        needsPatch = true
        patches.body = fixedBody
      }
    }

    if (needsPatch) {
      console.log(`🔧 Fixing: "${post.title}" (${post._id})`)
      await client.patch(post._id).set(patches).commit()
      console.log(`   ✅ Fixed\n`)
    } else {
      console.log(`✓ OK: "${post.title}"`)
    }
  }

  console.log('\nDone!')
}

fixMissingKeys().catch(console.error)
