import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types from our schemas folder
import { staff } from '../../../sanity/schemas/staff'
import { ministry } from '../../../sanity/schemas/ministry'
import { historyItem } from '../../../sanity/schemas/historyItem'
import { faq } from '../../../sanity/schemas/faq'
import { serviceTimes } from '../../../sanity/schemas/serviceTimes'
import { post } from '../../../sanity/schemas/post'
import { sermon } from '../../../sanity/schemas/sermon'
import { event } from '../../../sanity/schemas/event'
import { siteSettings } from '../../../sanity/schemas/siteSettings'
import { blockContent } from '../../../sanity/schemas/blockContent'
import { category } from '../../../sanity/schemas/category'
import { comment } from '../../../sanity/schemas/comment'
import { givingPage } from '../../../sanity/schemas/givingPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    staff,
    ministry,
    historyItem,
    faq,
    serviceTimes,
    post,
    sermon,
    event,
    siteSettings,
    category,
    comment,
    givingPage,
    // Objects
    blockContent,
  ],
}
