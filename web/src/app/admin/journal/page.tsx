'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Save,
  AlertCircle,
  Calendar,
  User,
  Tag,
} from 'lucide-react'
import { useToast } from '@/components/admin/Toast'
import { usePublish } from '@/components/admin/PublishContext'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import type { JournalPostItem } from '@/lib/cms/contentStore'

const DEFAULT_CATEGORIES = [
  'Craft Heritage',
  'Material Wisdom',
  'Slow Living',
  'Artisan Traditions',
  'Field Notes',
  'Cultural Essays',
]

export default function AdminJournalPage() {
  const { toast, success, error } = useToast()
  const { refreshPublishStatus } = usePublish()

  const [articles, setArticles] = useState<JournalPostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Modal states
  const [editingArticle, setEditingArticle] = useState<Partial<JournalPostItem> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<JournalPostItem | null>(null)

  const loadArticles = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/content?section=journal')
      const json = await res.json()
      if (res.ok && json.success) {
        setArticles(json.data || [])
      } else {
        error(json.error || 'Failed to load journal articles')
      }
    } catch (err: any) {
      error('Network error loading journal articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const handleCreateNew = () => {
    setIsNew(true)
    const newDoc: Partial<JournalPostItem> = {
      id: `journal-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Craft Heritage',
      author: 'Kiiro Studio',
      publishedAt: new Date().toISOString().split('T')[0],
      imageUrl: '',
      excerpt: '',
      body: '',
      published: true,
      seoTitle: '',
      seoDescription: '',
    }
    setEditingArticle(newDoc)
  }

  const handleTitleChange = (val: string) => {
    if (!editingArticle) return
    const updates: Partial<JournalPostItem> = { title: val }
    if (isNew && (!editingArticle.slug || editingArticle.slug === '')) {
      updates.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
    setEditingArticle((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingArticle) return

    if (!editingArticle.title?.trim()) {
      error('Please enter an article title')
      return
    }

    if (!editingArticle.slug?.trim()) {
      error('Please enter a valid URL slug')
      return
    }

    setSaving(true)
    try {
      const payload: JournalPostItem = {
        id: editingArticle.id || `journal-${Date.now()}`,
        title: editingArticle.title.trim(),
        slug: editingArticle.slug.trim(),
        standfirst: editingArticle.excerpt?.trim() || editingArticle.standfirst?.trim(),
        excerpt: editingArticle.excerpt?.trim() || editingArticle.standfirst?.trim(),
        category: editingArticle.category?.trim() || 'Craft Heritage',
        author: editingArticle.author?.trim() || 'Kiiro Studio',
        publishedAt: editingArticle.publishedAt || new Date().toISOString().split('T')[0],
        imageUrl: editingArticle.imageUrl || undefined,
        body: editingArticle.body || '',
        published: Boolean(editingArticle.published),
        seoTitle: editingArticle.seoTitle?.trim() || undefined,
        seoDescription: editingArticle.seoDescription?.trim() || undefined,
      }

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'journal',
          action: 'save',
          data: payload,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(isNew ? 'New article saved to drafts!' : 'Article updated in drafts!')
        await refreshPublishStatus()
        setEditingArticle(null)
        loadArticles()
      } else {
        error(json.error || 'Failed to save article')
      }
    } catch (err: any) {
      error(err.message || 'Error saving article')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'journal',
          action: 'delete',
          id: deleteTarget.slug || deleteTarget.id,
        }),
      })

      const json = await res.json()
      if (res.ok && json.success) {
        success(`Article "${deleteTarget.title}" deleted`)
        await refreshPublishStatus()
        setDeleteTarget(null)
        loadArticles()
      } else {
        error(json.error || 'Failed to delete article')
      }
    } catch (err: any) {
      error(err.message || 'Error deleting article')
    }
  }

  // Filtered articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      !searchQuery.trim() ||
      art.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      art.excerpt?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      art.author?.toLowerCase().includes(searchQuery.toLowerCase().trim())

    const matchesCategory =
      selectedCategory === 'all' ||
      art.category?.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const uniqueCategories = Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean))
  )

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#4F5B2A] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Editorial Management
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[#2B231F] mt-1">
            Journal Articles & Essays
          </h1>
          <p className="text-xs text-[#6E635B] font-light mt-0.5">
            Manage long-form cultural essays, field dispatches, craft histories, and editorial stories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/journal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-md border border-[#D8CEBE] bg-white text-[#2B231F] hover:bg-[#F3EFE6] transition-colors flex items-center gap-1.5"
          >
            <span>Live Journal</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6E635B]" />
          </Link>
          <button
            type="button"
            onClick={handleCreateNew}
            className="px-4 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#F3EFE6] border border-[#E8E1D5] p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#968A80] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or excerpt..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] uppercase tracking-wider text-[#968A80] font-medium shrink-0">
            Category:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#2B231F] text-[#FBF9F4]'
                : 'bg-white text-[#6E635B] border border-[#D8CEBE] hover:text-[#2B231F]'
            }`}
          >
            All ({articles.length})
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat!)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#2B231F] text-[#FBF9F4]'
                  : 'bg-white text-[#6E635B] border border-[#D8CEBE] hover:text-[#2B231F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Listing */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#4F5B2A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#6E635B]">Loading journal articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="border border-dashed border-[#D8CEBE] bg-[#FBF9F4] p-12 text-center rounded-lg space-y-3">
          <BookOpen className="w-8 h-8 text-[#968A80] mx-auto stroke-1" />
          <p className="font-display text-lg text-[#2B231F]">No articles found</p>
          <p className="text-xs text-[#6E635B] max-w-sm mx-auto font-light">
            {searchQuery || selectedCategory !== 'all'
              ? 'No articles match your current search and filter criteria.'
              : 'There are currently no journal articles in the CMS. Create your first article to publish cultural writing.'}
          </p>
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F5B2A] text-white text-xs font-semibold rounded-md hover:bg-[#3D4721] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Article</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id || art.slug}
              className="bg-white border border-[#D8CEBE] rounded-lg overflow-hidden shadow-xs hover:border-[#4F5B2A] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-44 w-full bg-[#EAE3D5] overflow-hidden">
                  {art.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#968A80]">
                      <BookOpen className="w-8 h-8 stroke-1 opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#2B231F]/90 backdrop-blur-xs text-[#FBF9F4] text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                      {art.category || 'Craft Heritage'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs ${
                        art.published !== false
                          ? 'bg-[#4F5B2A]/90 text-white'
                          : 'bg-[#C89B53]/90 text-[#2B231F]'
                      }`}
                    >
                      {art.published !== false ? (
                        <>
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-2.5 h-2.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-[#6E635B] font-light">
                    <span>{art.author || 'Kiiro Studio'}</span>
                    <span>•</span>
                    <span>{art.publishedAt || 'Recent'}</span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#2B231F] leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#6E635B] font-light leading-relaxed line-clamp-3">
                    {art.excerpt || art.standfirst || 'No excerpt provided.'}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 border-t border-[#E8E1D5] bg-[#FBF9F4] flex items-center justify-between gap-2">
                <Link
                  href={`/journal/${art.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#4F5B2A] hover:underline font-medium"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNew(false)
                      setEditingArticle({ ...art })
                    }}
                    className="p-1.5 text-xs text-[#2B231F] hover:bg-[#EAE3D5] rounded-md transition-colors"
                    title="Edit article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(art)}
                    className="p-1.5 text-xs text-[#8A3B35] hover:bg-[#FDF2F0] rounded-md transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Create / Edit Article Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4F5B2A]" />
                <h3 className="font-display text-xl text-[#2B231F] font-semibold">
                  {isNew ? 'Create Journal Article' : `Edit: ${editingArticle.title || 'Article'}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="p-1 text-[#6E635B] hover:text-[#2B231F] rounded-lg hover:bg-[#EAE3D5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. The Quiet Geometry of Indigo: Living Vats & Fermentation"
                    className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug || ''}
                    onChange={(e) =>
                      setEditingArticle((prev) => (prev ? { ...prev, slug: e.target.value } : null))
                    }
                    placeholder="quiet-geometry-of-indigo"
                    className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] font-mono focus:border-[#4F5B2A] focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#7A6E65]">
                    Accessible at /journal/[slug]
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Category
                  </label>
                  <input
                    type="text"
                    list="category-suggestions"
                    value={editingArticle.category || ''}
                    onChange={(e) =>
                      setEditingArticle((prev) => (prev ? { ...prev, category: e.target.value } : null))
                    }
                    placeholder="Craft Heritage"
                    className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
                  />
                  <datalist id="category-suggestions">
                    {DEFAULT_CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingArticle.author || ''}
                    onChange={(e) =>
                      setEditingArticle((prev) => (prev ? { ...prev, author: e.target.value } : null))
                    }
                    placeholder="Kiiro Studio"
                    className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={editingArticle.publishedAt || ''}
                    onChange={(e) =>
                      setEditingArticle((prev) => (prev ? { ...prev, publishedAt: e.target.value } : null))
                    }
                    className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Cover Image Upload & Media Library Picker */}
              <ImageUploadField
                label="Cover Image (Device Upload or Media Library)"
                value={editingArticle.imageUrl}
                onChange={(url) =>
                  setEditingArticle((prev) => (prev ? { ...prev, imageUrl: url } : null))
                }
                onRemove={() =>
                  setEditingArticle((prev) => (prev ? { ...prev, imageUrl: '' } : null))
                }
              />

              {/* Excerpt / Standfirst */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                  Short Excerpt / Standfirst *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingArticle.excerpt || editingArticle.standfirst || ''}
                  onChange={(e) =>
                    setEditingArticle((prev) =>
                      prev
                        ? {
                            ...prev,
                            excerpt: e.target.value,
                            standfirst: e.target.value,
                          }
                        : null
                    )
                  }
                  placeholder="A teaser summary displayed on cards and at the top of the article..."
                  className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] focus:border-[#4F5B2A] focus:outline-hidden"
                />
              </div>

              {/* Article Body Content */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]">
                    Article Body Content
                  </label>
                  <span className="text-[10px] text-[#7A6E65]">
                    Supports paragraphs separated by blank lines
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={editingArticle.body || ''}
                  onChange={(e) =>
                    setEditingArticle((prev) => (prev ? { ...prev, body: e.target.value } : null))
                  }
                  placeholder="Write the article essay here. Separate paragraphs with double newlines..."
                  className="w-full text-xs px-3 py-2 border border-[#D8CEBE] rounded-md bg-white text-[#2B231F] font-serif leading-relaxed focus:border-[#4F5B2A] focus:outline-hidden"
                />
              </div>

              {/* SEO Meta Fields */}
              <div className="p-3.5 bg-[#F3EFE6] border border-[#E8E1D5] rounded-md space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4F5B2A] block">
                  Search Engine Optimization (SEO)
                </span>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6E635B]">
                      SEO Meta Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.seoTitle || ''}
                      onChange={(e) =>
                        setEditingArticle((prev) =>
                          prev ? { ...prev, seoTitle: e.target.value } : null
                        )
                      }
                      placeholder="Custom page title for search engines"
                      className="w-full text-xs px-3 py-1.5 border border-[#D8CEBE] rounded bg-white text-[#2B231F]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#6E635B]">
                      SEO Meta Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.seoDescription || ''}
                      onChange={(e) =>
                        setEditingArticle((prev) =>
                          prev ? { ...prev, seoDescription: e.target.value } : null
                        )
                      }
                      placeholder="Search snippet summary"
                      className="w-full text-xs px-3 py-1.5 border border-[#D8CEBE] rounded bg-white text-[#2B231F]"
                    />
                  </div>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={editingArticle.published !== false}
                  onChange={(e) =>
                    setEditingArticle((prev) =>
                      prev ? { ...prev, published: e.target.checked } : null
                    )
                  }
                  className="h-4 w-4 rounded border-[#D8CEBE] text-[#4F5B2A] focus:ring-[#4F5B2A] cursor-pointer"
                />
                <label htmlFor="publishedToggle" className="text-xs font-semibold text-[#2B231F] cursor-pointer">
                  Publish Article (Check to make live on website; uncheck to keep as draft)
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E1D5]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 border border-[#D8CEBE] text-xs font-semibold rounded-md text-[#6E635B] hover:bg-[#EAE3D5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#4F5B2A] hover:bg-[#3D4721] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Article to Drafts'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF9F4] border border-[#D8CEBE] rounded-lg max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#8A3B35]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-display text-lg font-semibold text-[#2B231F]">
                Delete Article?
              </h3>
            </div>
            <p className="text-xs text-[#6E635B] leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-[#2B231F] font-semibold">{deleteTarget.title}</strong>? This
              will remove the article from drafts and schedule it for deletion in Sanity on next
              publish.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-[#D8CEBE] text-xs font-semibold rounded-md text-[#6E635B] hover:bg-[#EAE3D5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-[#8A3B35] hover:bg-[#702F2A] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
