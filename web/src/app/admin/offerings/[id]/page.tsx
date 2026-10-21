import React from 'react'
import { notFound } from 'next/navigation'
import { getContentStore } from '@/lib/cms/contentStore'
import { OfferingEditorClient } from '@/components/admin/OfferingEditorClient'

interface EditOfferingPageProps {
  params: Promise<{ id: string }>
}

export default async function EditOfferingPage({ params }: EditOfferingPageProps) {
  const { id } = await params
  const store = getContentStore()

  const offering = store.offerings.find((o) => o.slug === id)

  if (!offering) {
    notFound()
  }

  return <OfferingEditorClient initialOffering={offering} />
}
