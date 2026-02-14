/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j2qt3gmh'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'rlfcc'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: 'xreksp8yhefsduy2liup7xbq',
  },
})
