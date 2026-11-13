// src/data/portfolio.js
// Real campaign data from Altamash Ansari's work

import videoZayn   from '../assets/Zayn round 2 hell.mp4'
import videoNazim  from '../assets/Nazim Ahmed.mp4'
import videoFaisu  from '../assets/faisu flipklart brand reel pakg v3.mp4'
import videoJannat from '../assets/jannat zubair OZ 2.mp4'
import videoElvish from '../assets/elvsh.mp4'
import videoShivam from '../assets/Shivam Malik_.mp4'

export const portfolioProjects = [
  {
    id: 'campaign-zayn',
    title: 'Zayn × Offerzone Campaign',
    brand: 'Offerzone',
    category: 'Campaigns',
    objective: 'Creator collaboration campaign to drive awareness and subscriber growth for Offerzone via short-form content.',
    strategy: 'Partnered with Zayn for an authentic, high-engagement reel driving traffic to Offerzone Telegram.',
    myRole: 'Influencer Marketing Manager',
    creatorsInvolved: 'Zayn',
    outcome: 'Campaign successfully delivered as part of Offerzone\'s creator marketing push.',
    videoSrc: videoZayn,
    tags: ['Creator Collab', 'Offerzone'],
    featured: true,
  },
  {
    id: 'campaign-nazim',
    title: 'Nazim Ahmed × Offerzone Campaign',
    brand: 'Offerzone',
    category: 'Campaigns',
    objective: 'Brand awareness campaign leveraging Nazim Ahmed\'s audience for Offerzone Telegram channel growth.',
    strategy: 'End-to-end influencer campaign — briefing, content alignment, delivery and reporting.',
    myRole: 'Campaign Manager',
    creatorsInvolved: 'Nazim Ahmed',
    outcome: 'Delivered seamless creator collaboration with strong audience alignment.',
    videoSrc: videoNazim,
    tags: ['Creator Collab', 'Offerzone'],
    featured: true,
  },
  {
    id: 'campaign-faisu',
    title: 'Faisu × Flipkart Brand Reel',
    brand: 'Flipkart',
    category: 'Brand Partnerships',
    objective: 'Flipkart brand campaign reel featuring top creator Faisu — package collaboration for product launch awareness.',
    strategy: 'High-impact brand reel campaign with India\'s top creator, managed end-to-end by Altamash.',
    myRole: 'Influencer Marketing Manager',
    creatorsInvolved: 'Faisu (Mr. Faisu)',
    outcome: 'Premium brand collaboration successfully delivered for Flipkart campaign.',
    videoSrc: videoFaisu,
    tags: ['Brand Partnership', 'Flipkart'],
    featured: true,
  },
  {
    id: 'campaign-jannat',
    title: 'Jannat Zubair × Offerzone',
    brand: 'Offerzone',
    category: 'Campaigns',
    objective: 'Flagship influencer campaign with one of India\'s biggest creators to amplify Offerzone brand reach.',
    strategy: 'Mega-creator partnership driving mass awareness across Instagram and Telegram.',
    myRole: 'Influencer Marketing Manager',
    creatorsInvolved: 'Jannat Zubair',
    outcome: 'Highest-reach campaign in Offerzone\'s influencer marketing portfolio.',
    videoSrc: videoJannat,
    tags: ['Mega Creator', 'Offerzone'],
    featured: false,
  },
  {
    id: 'campaign-elvish',
    title: 'Elvish Yadav × Offerzone',
    brand: 'Offerzone',
    category: 'Campaigns',
    objective: 'High-impact collaboration leveraging Elvish Yadav\'s massive following for Offerzone Telegram subscriber growth.',
    strategy: 'Top-tier creator campaign with tailored content strategy.',
    myRole: 'Campaign Manager',
    creatorsInvolved: 'Elvish Yadav',
    outcome: 'Successfully executed high-engagement influencer activation.',
    videoSrc: videoElvish,
    tags: ['Top Creator', 'Offerzone'],
    featured: false,
  },
  {
    id: 'campaign-shivam',
    title: 'Shivam Malik × Offerzone',
    brand: 'Offerzone',
    category: 'Content Strategy',
    objective: 'Creator-driven content campaign to grow Offerzone\'s brand presence.',
    strategy: 'Partnered with Shivam Malik for authentic deal-focused content.',
    myRole: 'Content Strategist',
    creatorsInvolved: 'Shivam Malik',
    outcome: 'Effective content-led influencer collaboration.',
    videoSrc: videoShivam,
    tags: ['Creator Collab', 'Content Strategy'],
    featured: false,
  },
]

export const portfolioFilters = ['All', 'Campaigns', 'Brand Partnerships', 'Content Strategy']
