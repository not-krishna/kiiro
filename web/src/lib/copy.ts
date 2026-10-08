export function cleanVisibleCopy(value: string): string {
  if (!value) return ''
  return value
    .replace(/ΓÇó/g, '•')
    .replace(/ΓÇö/g, '—')
    .replace(/ΓÇÖ/g, "'")
    .replace(/ΓåÆ/g, '→')
    .replace(/Γ£ò/g, '✕')
    .replace(/Γ£ô/g, '✓')
    .replace(/\s+,/g, ',')
    .replace(/,{2,}/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

