/**
 * Seed ALL hardcoded content into Sanity CMS
 * 
 * This script creates Sanity documents for all content that was
 * previously hardcoded across the website:
 * - Site Settings (mission, vision, hero text)
 * - Service Times & Location
 * - Staff / Leadership
 * - Church History Timeline
 * - FAQs
 * - Ministries
 * - Events
 * - Giving Page Content
 * 
 * Run: node scripts/seed-all-content.mjs
 * 
 * Requires SANITY_API_TOKEN in .env.local with write permissions.
 */

import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load env vars
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

// Helper to check if a document of a given type already exists
async function docExists(type, filter = '') {
  const query = `count(*[_type == "${type}"${filter ? ' && ' + filter : ''}]) > 0`
  return client.fetch(query)
}

// Helper to create if not exists
async function createIfMissing(type, data, label) {
  try {
    const doc = await client.create({ _type: type, ...data })
    console.log(`  ✅ ${label}: ${doc._id}`)
    return doc
  } catch (err) {
    console.error(`  ❌ ${label}: ${err.message}`)
    return null
  }
}

// ============================================================
// 1. SITE SETTINGS (singleton)
// ============================================================
async function seedSiteSettings() {
  console.log('\n📋 Site Settings...')
  const exists = await docExists('siteSettings')
  if (exists) {
    console.log('  ⏭️  Site Settings already exists, skipping')
    return
  }

  await createIfMissing('siteSettings', {
    siteName: 'The Apostles Ministry',
    siteTagline: 'A place where everyone belongs.',
    heroTitle: 'Welcome Home',
    heroSubtitle: 'A place where everyone belongs',
    missionStatement: 'It is the mission of RFLCC to be followers of Christ, at all times; triumphant over every obstacle, the adversary, sin, and imaginations. We will share the Love of God, the life, death, resurrection, and constant intercession of Jesus Christ, and the sweet communion, fellowship, and comfort of the Holy Ghost. We will accomplish this by Teaching, Agape, Fellowship, Evangelism, and Word of God.',
    visionStatement: 'To be a church where everyone can experience the transforming love of Jesus and become who God created them to be.',
    statement501c3: 'The Apostles Ministry is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a giving statement for your records.',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  }, 'Site Settings')
}

// ============================================================
// 2. SERVICE TIMES & LOCATION (singleton)
// ============================================================
async function seedServiceTimes() {
  console.log('\n⏰ Service Times & Location...')
  const exists = await docExists('serviceTimes')
  if (exists) {
    console.log('  ⏭️  Service Times already exists, skipping')
    return
  }

  await createIfMissing('serviceTimes', {
    sundayServices: [
      { _key: 'sun1', name: 'Morning Worship', time: '9:00 AM' },
      { _key: 'sun2', name: 'Sunday School', time: '10:30 AM' },
      { _key: 'sun3', name: 'Evening Service', time: '6:00 PM' },
    ],
    midweekServices: [
      { _key: 'mid1', name: 'Bible Study', day: 'Wednesday', time: '7:00 PM' },
    ],
    locationName: 'Main Campus',
    address: 'High Calling Ministries\n401-A Prince George\'s Blvd\nUpper Marlboro, MD 20774',
    phoneNumber: '(202) 503-9579',
    email: 'admin@rflcc.org',
    googleMapsLink: 'https://maps.google.com',
  }, 'Service Times')
}

// ============================================================
// 3. STAFF / LEADERSHIP
// ============================================================
async function seedStaff() {
  console.log('\n👥 Staff / Leadership...')
  const exists = await docExists('staff')
  if (exists) {
    console.log('  ⏭️  Staff already exist, skipping')
    return
  }

  const staffMembers = [
    {
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      bio: 'Pastor John has been leading our congregation for over 15 years with a heart for teaching and shepherding.',
      rank: 1,
      email: 'pastor@theapostlesministry.org',
    },
    {
      name: 'Jane Smith',
      role: 'Worship Pastor',
      bio: 'Jane leads our worship ministry with a passion for creating meaningful worship experiences.',
      rank: 2,
    },
    {
      name: 'Michael Johnson',
      role: 'Youth Pastor',
      bio: 'Michael is dedicated to helping the next generation discover their faith and purpose.',
      rank: 3,
    },
    {
      name: 'Sarah Williams',
      role: "Children's Director",
      bio: 'Sarah creates fun and engaging environments where kids can learn about Jesus.',
      rank: 4,
    },
  ]

  for (const member of staffMembers) {
    await createIfMissing('staff', member, member.name)
  }
}

// ============================================================
// 4. CHURCH HISTORY TIMELINE
// ============================================================
async function seedHistory() {
  console.log('\n📜 Church History Timeline...')
  const exists = await docExists('historyItem')
  if (exists) {
    console.log('  ⏭️  History items already exist, skipping')
    return
  }

  const items = [
    { year: '1985', title: 'Church Founded', description: 'Our journey began with a small group of believers meeting in a living room. What started as a dream became reality through faith and dedication.', order: 1 },
    { year: '1992', title: 'First Building', description: 'We moved into our first dedicated worship space on Main Street. This milestone marked a new chapter in our growth.', order: 2 },
    { year: '2005', title: 'Community Outreach', description: 'Launched our first major community outreach program, feeding over 500 families annually. We became a beacon of hope in our neighborhood.', order: 3 },
    { year: '2015', title: 'New Campus', description: 'Opened our current campus with expanded facilities for ministry, including a youth center and community hall.', order: 4 },
    { year: '2020', title: 'Digital Ministry', description: 'Expanded online presence to reach people around the world. Our services now touch lives across continents.', order: 5 },
  ]

  for (const item of items) {
    await createIfMissing('historyItem', item, `${item.year} - ${item.title}`)
  }
}

// ============================================================
// 5. FAQs
// ============================================================
async function seedFAQs() {
  console.log('\n❓ FAQs...')
  const exists = await docExists('faq')
  if (exists) {
    console.log('  ⏭️  FAQs already exist, skipping')
    return
  }

  const faqs = [
    {
      question: 'What should I wear?',
      answer: "Come as you are! You'll see people in everything from jeans to suits. We want you to be comfortable.",
      category: 'visitors',
      order: 1,
    },
    {
      question: 'What about my kids?',
      answer: 'We have engaging, age-appropriate programs for children from nursery through 5th grade during all services. Our trained staff and volunteers create a safe, fun environment where kids learn about Jesus.',
      category: 'kids',
      order: 2,
    },
    {
      question: 'Where do I park?',
      answer: 'We have ample free parking in our main lot. Look for the "First Time Guest" signs for reserved spots near the entrance. Parking attendants will be happy to direct you.',
      category: 'visitors',
      order: 3,
    },
    {
      question: 'How long are the services?',
      answer: 'Our services typically last about 75-90 minutes. We start with contemporary worship music followed by a practical, Bible-based message.',
      category: 'services',
      order: 4,
    },
    {
      question: 'How can I get involved?',
      answer: "We'd love to help you find your place! Fill out a connection card or visit our Welcome Center after any service. We have ministry teams for every interest from worship to serving in our community.",
      category: 'involvement',
      order: 5,
    },
  ]

  for (const faq of faqs) {
    await createIfMissing('faq', faq, faq.question)
  }
}

// ============================================================
// 6. MINISTRIES
// ============================================================
async function seedMinistries() {
  console.log('\n⛪ Ministries...')
  const exists = await docExists('ministry')
  if (exists) {
    console.log('  ⏭️  Ministries already exist, skipping')
    return
  }

  const ministries = [
    { name: 'Kids Ministry', slug: { _type: 'slug', current: 'kids' }, description: 'Fun and engaging programs for children of all ages.', featured: true, order: 1 },
    { name: 'Youth Ministry', slug: { _type: 'slug', current: 'youth' }, description: 'Building the next generation of faith leaders.', featured: true, order: 2 },
    { name: 'Worship Team', slug: { _type: 'slug', current: 'worship' }, description: 'Leading our congregation in praise and worship.', featured: true, order: 3 },
    { name: 'Outreach', slug: { _type: 'slug', current: 'outreach' }, description: 'Serving our community with love and compassion.', featured: true, order: 4 },
  ]

  for (const m of ministries) {
    await createIfMissing('ministry', m, m.name)
  }
}

// ============================================================
// 7. EVENTS
// ============================================================
async function seedEvents() {
  console.log('\n📅 Events...')
  const exists = await docExists('event')
  if (exists) {
    console.log('  ⏭️  Events already exist, skipping')
    return
  }

  const now = new Date()
  const makeDate = (daysFromNow, hour = 10) => {
    const d = new Date(now)
    d.setDate(d.getDate() + daysFromNow)
    d.setHours(hour, 0, 0, 0)
    return d.toISOString()
  }

  const events = [
    {
      title: 'Sunday Worship Service',
      slug: { _type: 'slug', current: 'sunday-worship' },
      date: makeDate(((7 - now.getDay()) % 7) || 7, 10),
      location: "High Calling Ministries, 401-A Prince George's Blvd, Upper Marlboro, MD 20774",
      description: 'Join us for a powerful time of praise, worship, and the Word. All are welcome!',
      category: 'sunday-service',
      featured: true,
      cost: 'Free',
    },
    {
      title: 'Midweek Bible Study',
      slug: { _type: 'slug', current: 'bible-study' },
      date: makeDate(3, 19),
      location: 'High Calling Ministries',
      description: 'Dive deeper into the Word of God with our midweek Bible study. Bring your Bible and a friend!',
      category: 'bible-study',
    },
    {
      title: 'Youth Night',
      slug: { _type: 'slug', current: 'youth-night' },
      date: makeDate(5, 18),
      location: 'High Calling Ministries — Youth Center',
      description: 'An evening of fellowship, games, worship, and an inspiring message for young people ages 13-25.',
      category: 'youth',
      cost: 'Free',
    },
    {
      title: 'Online Prayer Meeting',
      slug: { _type: 'slug', current: 'online-prayer' },
      date: makeDate(2, 7),
      description: 'Start your day with the power of prayer. Join us online via Zoom for corporate intercession.',
      category: 'online',
      isOnline: true,
      onlineLink: 'https://zoom.us',
    },
    {
      title: 'Community Outreach & Food Drive',
      slug: { _type: 'slug', current: 'community-outreach' },
      date: makeDate(12, 9),
      location: 'Upper Marlboro Community Center',
      description: 'Serving our community with love! Volunteers are welcome to help distribute food and essentials to families in need.',
      category: 'outreach',
    },
    {
      title: 'Annual Church Anniversary Celebration',
      slug: { _type: 'slug', current: 'anniversary' },
      date: makeDate(20, 11),
      endDate: makeDate(20, 15),
      location: 'High Calling Ministries',
      description: 'Celebrate the faithfulness of God as we mark another year of ministry. Special guest speakers, music, and dinner to follow.',
      category: 'special',
      featured: true,
      cost: 'Free',
    },
  ]

  for (const evt of events) {
    await createIfMissing('event', evt, evt.title)
  }
}

// ============================================================
// 8. GIVING PAGE (singleton)
// ============================================================
async function seedGivingPage() {
  console.log('\n💝 Giving Page...')
  const exists = await docExists('givingPage')
  if (exists) {
    console.log('  ⏭️  Giving Page already exists, skipping')
    return
  }

  await createIfMissing('givingPage', {
    heroTitle: 'Give Generously',
    heroVerse: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
    heroVerseRef: '2 Corinthians 9:7',
    whyWeGiveHeading: 'Why We Give',
    whyWeGiveSubtext: "Your generosity makes an eternal impact. Here's how your gifts are used:",
    givingBreakdown: [
      { _key: 'gb1', title: 'Local Outreach', percentage: '30%', description: 'Feeding the hungry, clothing the needy, and serving our local community with the love of Christ.' },
      { _key: 'gb2', title: 'Ministry Operations', percentage: '50%', description: "Supporting worship, children's programs, youth ministry, and creating spaces for spiritual growth." },
      { _key: 'gb3', title: 'Global Missions', percentage: '20%', description: 'Partnering with missionaries and organizations around the world to spread the Gospel.' },
    ],
    givingMethods: [
      { _key: 'gm1', title: 'Online Giving', description: 'Give securely online using credit card, debit card, or bank transfer through our Tithe.ly integration.', icon: 'credit-card' },
      { _key: 'gm2', title: 'In Person', description: 'Give during any of our services using the offering boxes located at the back of the sanctuary.', note: 'Cash, checks, and giving envelopes accepted', icon: 'building' },
      { _key: 'gm3', title: 'Mail a Check', description: 'Mail your donation to our church office. Make checks payable to "The Apostles Ministry".', icon: 'mail' },
    ],
    taxStatement: 'The Apostles Ministry is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a giving statement for your records.',
    mailingAddress: 'The Apostles Ministry\n401-A Prince George\'s Blvd\nUpper Marlboro, MD 20774',
  }, 'Giving Page')
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('🚀 Seeding ALL hardcoded content into Sanity...')
  console.log(`   Project: ${projectId}`)
  console.log(`   Dataset: ${dataset}`)

  await seedSiteSettings()
  await seedServiceTimes()
  await seedStaff()
  await seedHistory()
  await seedFAQs()
  await seedMinistries()
  await seedEvents()
  await seedGivingPage()

  console.log('\n🎉 Done! All content seeded.')
  console.log('📌 Remember to PUBLISH the documents in Sanity Studio (they are created as drafts).')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
