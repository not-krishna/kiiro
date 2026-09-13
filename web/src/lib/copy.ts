export function cleanVisibleCopy(value: string): string {
  if (!value) return ''
  return value
    .replace(/ΓÇó/g, '•')
    .replace(/ΓÇö/g, '—')
    .replace(/ΓÇÖ/g, "'")
    .replace(/ΓåÆ/g, '→')
    .replace(/Γ£ò/g, '✕')
    .replace(/Γ£ô/g, '✓')
    .replace(/\bPartnerships\b/g, 'Collaborations')
    .replace(/\bPartnership\b/g, 'Collaboration')
    .replace(/\bpartnerships\b/g, 'collaborations')
    .replace(/\bpartnership\b/g, 'collaboration')
    .replace(/\s+,/g, ',')
    .replace(/,{2,}/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

