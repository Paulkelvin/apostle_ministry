/**
 * Seed Service Times & Location document into Sanity
 * Also updates siteSettings with heroSubtitle if missing
 * 
 * Run: node scripts/seed-service-times.mjs
 */

import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('❌ Missing env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function seedServiceTimes() {
  console.log('\n⏰ Seeding Service Times & Location...')
  
  // Check if already exists
  const existing = await client.fetch('*[_type == "serviceTimes"][0]')
  
  if (existing) {
    console.log('  ⏭️  Service Times document already exists')
    console.log(`  📄 Document ID: ${existing._id}`)
    
    // Check if it has data
    if (!existing.sundayServices?.length) {
      console.log('  📝 Document exists but is empty, updating with data...')
      
      const updated = await client
        .patch(existing._id)
        .set({
          sundayServices: [
            { _key: 'sun1', name: 'Sunday Worship Service (via Zoom)', time: '4:00 PM' },
          ],
          midweekServices: [
            { _key: 'mid1', name: 'Bible Study (via Zoom)', day: 'Thursday', time: '7:30 PM' },
          ],
          locationName: 'Mailing Address (Virtual Ministry)',
          address: "6916 Hillmeade Road\nGlenn Dale, MD 20769",
          phoneNumber: '(202) 503-9579',
          email: 'admin@rlfcc.org',
          googleMapsLink: 'https://maps.google.com/?q=6916+Hillmeade+Road+Glenn+Dale+MD+20769',
        })
        .commit()
      
      console.log('  ✅ Service Times updated with data')
    } else {
      console.log('  ✅ Service Times already has data')
    }
  } else {
    // Create new document
    const doc = await client.create({
      _type: 'serviceTimes',
      sundayServices: [
        { _key: 'sun1', name: 'Sunday Worship Service (via Zoom)', time: '4:00 PM' },
      ],
      midweekServices: [
        { _key: 'mid1', name: 'Bible Study (via Zoom)', day: 'Thursday', time: '7:30 PM' },
      ],
      locationName: 'Mailing Address (Virtual Ministry)',
      address: "6916 Hillmeade Road\nGlenn Dale, MD 20769",
      phoneNumber: '(202) 503-9579',
      email: 'admin@rlfcc.org',
      googleMapsLink: 'https://maps.google.com/?q=6916+Hillmeade+Road+Glenn+Dale+MD+20769',
    })
    
    console.log(`  ✅ Service Times created: ${doc._id}`)
  }
}

async function seedHeroSubtitle() {
  console.log('\n🏠 Checking Hero Subtitle in Site Settings...')
  
  const settings = await client.fetch('*[_type == "siteSettings"][0]')
  
  if (!settings) {
    console.log('  ⚠️  No siteSettings document found. Creating one...')
    
    const doc = await client.create({
      _type: 'siteSettings',
      _id: 'siteSettings',
      siteName: 'Restoring Life Family Community Center',
      siteTagline: 'A place where everyone belongs.',
      heroTitle: 'Welcome Home',
      heroSubtitle: 'A place where everyone belongs',
      missionStatement: 'It is the mission of RLFCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost. We will accomplish this by Teaching, Agape, Fellowship, Evangelism, and Word of God.',
      visionStatement: 'To be a church where everyone can experience the transforming love of Jesus and become who God created them to be.',
    })
    
    console.log(`  ✅ Site Settings created with hero subtitle: ${doc._id}`)
  } else if (!settings.heroSubtitle) {
    console.log('  📝 Site Settings exists but heroSubtitle is missing, adding...')
    
    await client
      .patch(settings._id)
      .set({ heroSubtitle: 'A place where everyone belongs' })
      .commit()
    
    console.log('  ✅ Hero subtitle added to Site Settings')
  } else {
    console.log(`  ✅ Hero subtitle already exists: "${settings.heroSubtitle}"`)
  }
}

async function main() {
  console.log('🌱 Sanity Content Seeder')
  console.log(`   Project: ${projectId}`)
  console.log(`   Dataset: ${dataset}`)
  
  await seedServiceTimes()
  await seedHeroSubtitle()
  
  console.log('\n✨ Done!')
}

main().catch(console.error)
