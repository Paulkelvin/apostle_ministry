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

async function createSampleData() {
  console.log('🚀 Creating sample blog data...\n')

  try {
    // 1. Create staff author if not exists
    const staffQuery = `*[_type == "staff" && name == "Pastor David"][0]`
    let author = await client.fetch(staffQuery)

    if (!author) {
      console.log('📝 Creating sample author...')
      author = await client.create({
        _type: 'staff',
        name: 'Pastor David',
        role: 'Senior Pastor',
        bio: 'Pastor David leads The Apostles Ministry with a heart for discipleship and community impact.',
        rank: 1,
        email: 'david@theapostlesministry.org',
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
        ],
      })
      console.log(`✅ Author created: ${author._id}\n`)
    } else {
      console.log(`✅ Author found: ${author._id}\n`)
    }

    // 2. Create categories
    console.log('📚 Creating categories...')
    const categories = [
      { title: 'Devotional', slug: { current: 'devotional' }, color: '#6A3B3F' },
      { title: 'Announcement', slug: { current: 'announcement' }, color: '#C59853' },
      { title: 'Testimony', slug: { current: 'testimony' }, color: '#8B6F47' },
      { title: 'Leadership', slug: { current: 'leadership' }, color: '#4A2629' },
    ]

    const createdCategories = await Promise.all(
      categories.map((cat) =>
        client.create({
          _type: 'category',
          ...cat,
        })
      )
    )
    console.log(`✅ Created ${createdCategories.length} categories\n`)

    // 3. Create posts
    console.log('📄 Creating sample posts...')
    const posts = [
      {
        title: 'Finding Peace in Uncertain Times',
        slug: { current: 'finding-peace-uncertain-times' },
        excerpt:
          'In a world full of chaos, discover how faith anchors us and provides lasting peace. Explore practical ways to trust God even when circumstances seem overwhelming.',
        featured: true,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        body: [
          {
            _type: 'block',
            _key: 'block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: 'We live in a world of constant change and uncertainty. Every day brings new challenges, headlines that make us anxious, and situations that feel beyond our control. But what if I told you that lasting peace is not found in perfect circumstances, but in perfect faith?',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-2',
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'The Foundation of Peace',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: 'Jesus told His disciples: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you." (John 14:27) This peace is not the absence of problems, but the presence of God in the midst of our problems.',
                marks: [],
              },
            ],
          },
          {
            _type: 'verseBlock',
            _key: 'verse-1',
            verse: 'Philippians 4:6-7 - "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."',
            reference: 'Philippians 4:6-7',
          },
          {
            _type: 'block',
            _key: 'block-4',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-4',
                text: 'Three Ways to Find Peace',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-5',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-5',
                text: '1. Trust in God\'s Sovereignty',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-6',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-6',
                text: 'God is in control, even when we cannot see the big picture. He orchestrates all things for the good of those who love Him.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-7',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-7',
                text: '2. Practice Prayer and Meditation',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-8',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-8',
                text: 'Spending time in prayer and reading Scripture centers our minds on eternal truth rather than temporary troubles.',
                marks: [],
              },
            ],
          },
          {
            _type: 'calloutBlock',
            _key: 'callout-1',
            type: 'scripture',
            title: 'Key Verse',
            body: 'Cast all your anxiety on him because he cares for you. (1 Peter 5:7)',
          },
          {
            _type: 'block',
            _key: 'block-9',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-9',
                text: '3. Lean on Community',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-10',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-10',
                text: 'God designed us for community. Share your burdens with trusted friends, small group members, or church leaders. Their prayers and encouragement bring tremendous comfort.',
                marks: [],
              },
            ],
          },
          {
            _type: 'pullQuote',
            _key: 'quote-1',
            quote: 'Peace comes not from the absence of trouble, but from the presence of trust.',
            attribution: 'Anonymous',
          },
          {
            _type: 'block',
            _key: 'block-11',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-11',
                text: 'This week, I encourage you to take one step towards peace. Whether it\'s praying about a specific concern, reaching out to a friend, or sitting with Scripture, let God\'s peace guard your heart.',
                marks: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Join Us for Easter Celebration',
        slug: { current: 'easter-celebration-2026' },
        excerpt: 'Save the date! We are hosting a special Easter Sunday service celebrating the resurrection of Christ with music, testimonies, and communion.',
        featured: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        body: [
          {
            _type: 'block',
            _key: 'block-1',
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: 'A Celebration of Hope and Resurrection',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'Easter is the most important day in the Christian calendar. It marks the resurrection of Jesus Christ and the hope of eternal life for all believers. This year, we\'re inviting you to celebrate with us in a way you\'ll never forget.',
                marks: [],
              },
            ],
          },
          {
            _type: 'calloutBlock',
            _key: 'callout-1',
            type: 'tip',
            title: 'Service Details',
            body: 'Sunday, April 20, 2026 at 9:00 AM and 11:00 AM. Special music, baptisms, and celebration breakfast to follow.',
          },
          {
            _type: 'block',
            _key: 'block-3',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: 'What to Expect',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-4',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-4',
                text: 'Contemporary worship with our full band, a powerful message about resurrection hope, testimonies from those who\'ve experienced Christ\'s transforming power, and a special communion service.',
                marks: [],
              },
            ],
          },
          {
            _type: 'buttonLink',
            _key: 'button-1',
            label: 'Register Now',
            url: 'https://theapostlesministry.org/events',
            style: 'primary',
          },
        ],
      },
      {
        title: 'How to Start Your Prayer Journal',
        slug: { current: 'start-prayer-journal' },
        excerpt: 'A practical guide to beginning a prayer journal and building deeper intimacy with God through written prayers and reflections.',
        featured: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        body: [
          {
            _type: 'block',
            _key: 'block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: 'A prayer journal is a simple but powerful tool that helps you align your heart with God\'s will. By writing down your prayers, you create a record of God\'s faithfulness and answers.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'Getting Started',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: 'Choose a journal that feels right to you—a simple notebook, a leather journal, or even a digital app. The format doesn\'t matter; consistency does.',
                marks: [],
              },
            ],
          },
          {
            _type: 'calloutBlock',
            _key: 'callout-1',
            type: 'info',
            title: 'Pro Tip',
            body: 'Start with 5-10 minutes a day. You can write freely, use a structured template, or follow a devotional guide—whatever helps you stay consistent.',
          },
        ],
      },
      {
        title: 'From Doubt to Faith: Sarah\'s Story',
        slug: { current: 'sarah-doubt-to-faith' },
        excerpt: 'Sarah walked away from church for years, wrestling with doubts and pain. Read how she found her way back and discovered a deeper faith than ever before.',
        featured: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
        body: [
          {
            _type: 'pullQuote',
            _key: 'quote-1',
            quote: 'I never thought I\'d come back to church. I thought my faith was broken beyond repair.',
            attribution: 'Sarah',
          },
          {
            _type: 'block',
            _key: 'block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: 'Sarah was raised in a loving Christian home, but as a teenager and young adult, she encountered situations that shook her faith. An unanswered prayer. A friend\'s tragedy. A conflict with church leadership. Layer by layer, doubt built up until she decided to step away completely.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'The Turning Point',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: '"After 8 years away, I hit rock bottom. Nothing I was doing—career success, relationships, personal achievements—brought me peace. A coworker invited me to a Bible study at the Apostles Ministry, and honestly, I just wanted to get her to stop asking."',
                marks: [{ _type: 'em' }],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-4',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-4',
                text: 'That first night, she was met with grace. No judgment. No "where have you been?" Just genuine love and acceptance. As she started studying Scripture again, she realized her doubts weren\'t sinful—they were human. And they were invitations to a deeper faith.',
                marks: [],
              },
            ],
          },
          {
            _type: 'calloutBlock',
            _key: 'callout-1',
            type: 'scripture',
            title: 'Sarah\'s Verse',
            body: 'Thomas said to him, "Lord, how can we know the way?" Jesus answered, "I am the way and the truth and the life." (John 14:5-6) — Thomas\' doubt became the foundation of his greatest confession of faith.',
          },
        ],
      },
      {
        title: 'Leadership in Crisis: What Jesus Teaches Us',
        slug: { current: 'jesus-leadership-crisis' },
        excerpt: 'How the principles of servant leadership and compassion Jesus demonstrated can guide church and community leaders during difficult times.',
        featured: false,
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 14 days ago
        body: [
          {
            _type: 'block',
            _key: 'block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: 'In times of crisis, leadership is tested. What do we do when resources are scarce, when support is needed most, or when the path forward is unclear?',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-2',
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'The Jesus Model of Crisis Leadership',
                marks: [],
              },
            ],
          },
          {
            _type: 'verseBlock',
            _key: 'verse-1',
            verse: 'The greatest among you must be your servant. (Matthew 23:11)',
            reference: 'Matthew 23:11',
          },
          {
            _type: 'block',
            _key: 'block-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: 'Jesus demonstrated that real leadership isn\'t about positional authority or command and control—it\'s about service. Even when He had all authority in heaven and earth, He spent His time with the forgotten, the sick, the broken.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-4',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-4',
                text: 'Three Crisis Leadership Lessons from Jesus',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-5',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-5',
                text: '1. Lead with Compassion, Not Control',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'pullQuote',
            _key: 'quote-1',
            quote: 'When He saw the crowds, he had compassion on them, because they were harassed and helpless.',
            attribution: 'Matthew 9:36',
          },
          {
            _type: 'block',
            _key: 'block-6',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-6',
                text: '2. Empower Others—Don\'t Hoard Authority',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-7',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-7',
                text: 'Jesus sent His disciples out two by two, giving them authority and responsibility. He trusted them to lead in His absence.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-8',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-8',
                text: '3. Remain Grounded in Prayer and Dependence on God',
                marks: [{ _type: 'strong' }],
              },
            ],
          },
          {
            _type: 'calloutBlock',
            _key: 'callout-1',
            type: 'warning',
            title: 'Challenge',
            body: 'This week, examine one area where you lead. Are you leading with service or control? How can you empower others and rely more on God?',
          },
        ],
      },
    ]

    const createdPosts = await Promise.all(
      posts.map((post) =>
        client.create({
          _type: 'post',
          ...post,
        })
      )
    )
    console.log(`✅ Created ${createdPosts.length} posts\n`)

    // 4. Patch posts with author and categories
    console.log('🔗 Linking authors and categories...')
    await Promise.all([
      // Post 1: Devotional + Leadership
      client
        .patch(createdPosts[0]._id)
        .set({
          author: { _ref: author._id },
          categories: [
            { _ref: createdCategories[0]._id },
            { _ref: createdCategories[3]._id },
          ],
        })
        .commit(),
      // Post 2: Announcement
      client
        .patch(createdPosts[1]._id)
        .set({
          author: { _ref: author._id },
          categories: [{ _ref: createdCategories[1]._id }],
        })
        .commit(),
      // Post 3: Devotional
      client
        .patch(createdPosts[2]._id)
        .set({
          author: { _ref: author._id },
          categories: [{ _ref: createdCategories[0]._id }],
        })
        .commit(),
      // Post 4: Testimony
      client
        .patch(createdPosts[3]._id)
        .set({
          author: { _ref: author._id },
          categories: [{ _ref: createdCategories[2]._id }],
        })
        .commit(),
      // Post 5: Leadership
      client
        .patch(createdPosts[4]._id)
        .set({
          author: { _ref: author._id },
          categories: [{ _ref: createdCategories[3]._id }],
        })
        .commit(),
    ])
    console.log(`✅ Linked authors and categories\n`)

    // 5. Publish all
    console.log('📤 Publishing posts...')
    await Promise.all(
      createdPosts.map((post) =>
        client.transaction().create({ ...post, _id: post._id }).commit()
      )
    )

    // Actually publish by creating published versions
    const publishOps = createdPosts.map((post) => ({
      patch: {
        id: post._id,
        set: { publishedAt: new Date().toISOString() },
      },
    }))

    // Use simpler approach: just update publishedAt
    await Promise.all(
      createdPosts.map((post) =>
        client.patch(post._id).set({ publishedAt: post.publishedAt }).commit()
      )
    )

    console.log(`✅ All posts published!\n`)
    console.log('🎉 Sample blog data successfully created!')
    console.log('\nNow visit: https://your-sanity-studio.sanity.studio')
    console.log('And navigate to "Blog Posts" to see your new content!')
  } catch (error) {
    console.error('❌ Error creating sample data:', error)
    process.exit(1)
  }
}

createSampleData()
