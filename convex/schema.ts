import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  podcasts: defineTable({
    user: v.id('users'),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    audioStorageId: v.union(v.id('_storage'), v.null()),
    imageStorageId: v.union(v.id('_storage'), v.null()),
    author: v.string(),
    authorImageUrl: v.optional(v.string()),
    authorId: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
    blurhash: v.string(),
    transcription: v.optional(v.string())
  })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'podcastTitle' })
    .searchIndex('search_body', { searchField: 'podcastDescription' }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.optional(v.string()),
    blurhash: v.optional(v.string()),
    clerkId: v.string(),
    name: v.string()
  }).searchIndex('search_name', { searchField: 'name' }),
  payments: defineTable({
    userId: v.string(),
    status: v.optional(v.union(v.literal('pending'), v.literal('paid'))),
    stripeId: v.optional(v.string()),
    message: v.optional(v.string())
  }),
  plans: defineTable({
    userId: v.string(),
    tokens: v.number(),
    name: v.union(v.literal('pro'), v.literal('unlimited'), v.literal('free')),
    interval: v.union(v.literal('month'), v.literal('year'), v.literal('no')),
    startTime: v.number(),
    endTime: v.number(),
    subscriptionId: v.optional(v.string())
  }).searchIndex('search_tokens', { searchField: 'tokens' })
})
