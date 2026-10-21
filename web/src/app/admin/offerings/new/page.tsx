import React from 'react'
import { OfferingEditorClient } from '@/components/admin/OfferingEditorClient'
import type { OfferingItem } from '@/content/offeringsData'

export const dynamic = 'force-dynamic'

const defaultOffering: OfferingItem = {
  slug: '',
  title: '',
  category: 'traditional',
  pillar: 'Root',
  origin: 'India',
  age: 'Generations of living heritage',
  definition: '',
  impact: '',
  whyLearn: '',
  keyProcess: [
    'Preparation of authentic raw materials and craft history',
    'Step-by-step master artisan demonstration',
    'Guided hands-on crafting and tactile repetition',
    'Finishing, detailing, and restorative reflection',
  ],
  learningDuration: 'A lifetime of disciplined lineage study',
  workshopDuration: '3 Hours hands-on masterclass',
  format: 'Hands-on experiential workshop',
  locations: ['Mumbai', 'Bangalore', 'Goa', 'Jaipur'],
  audience: ['Corporate teams', 'Individuals', 'Creative leaders'],
  facilitator: 'Master Artisan & Lineage Practitioner',
  outcomes: 'Handcrafted keepsake created with your own hands',
  pricing: { t15: 3500, t26: 3000, t46: 2500, t100: 2000 },
  imageUrl: '',
}

export default function NewOfferingPage() {
  return <OfferingEditorClient initialOffering={defaultOffering} isNew={true} />
}
