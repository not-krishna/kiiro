import React from 'react'
import { notFound } from 'next/navigation'
import { getContentStore } from '@/lib/cms/contentStore'
import { EventForm } from '@/components/admin/EventForm'

interface EditEventPageProps {
  params: Promise<{ id: string }>
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params
  const store = getContentStore()

  const event = store.events.find(
    (e) => (e.id && e.id === id) || (e.slug && e.slug === id)
  )

  if (!event) {
    notFound()
  }

  return <EventForm initialData={event} isNew={false} />
}
