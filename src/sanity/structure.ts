import type {StructureResolver} from 'sanity/structure'

// Custom structure for The Apostles Ministry CMS
export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Apostles Ministry')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      // Service Times (singleton)
      S.listItem()
        .title('Service Times & Location')
        .id('serviceTimes')
        .child(
          S.document()
            .schemaType('serviceTimes')
            .documentId('serviceTimes')
        ),
      
      S.divider(),
      
      // Content
      S.listItem()
        .title('Blog Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog Posts')),
      
      S.listItem()
        .title('Blog Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Blog Categories')),
      
      S.listItem()
        .title('Blog Comments')
        .schemaType('comment')
        .child(S.documentTypeList('comment').title('Blog Comments')),
      
      S.listItem()
        .title('Sermons')
        .schemaType('sermon')
        .child(S.documentTypeList('sermon').title('Sermons')),
      
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),
      
      S.divider(),
      
      // People & Groups
      S.listItem()
        .title('Staff & Leadership')
        .schemaType('staff')
        .child(S.documentTypeList('staff').title('Staff & Leadership')),
      
      S.listItem()
        .title('Ministries')
        .schemaType('ministry')
        .child(S.documentTypeList('ministry').title('Ministries')),
      
      S.divider(),
      
      // About
      S.listItem()
        .title('Church History Timeline')
        .schemaType('historyItem')
        .child(S.documentTypeList('historyItem').title('History Timeline')),
      
      S.listItem()
        .title('FAQs')
        .schemaType('faq')
        .child(S.documentTypeList('faq').title('FAQs')),
    ])
