import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { internal } from './_generated/api'

export const getUrl = mutation({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  }
})

export const createPodcast = mutation({
  args: {
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    imageUrl: v.string(),
    voiceType: v.string(),
    imagePrompt: v.string(),
    voicePrompt: v.string(),
    views: v.number(),
    blurhash: v.string(),
    audioDuration: v.number(),
    audioStorageId: v.union(v.id('_storage'), v.null()),
    imageStorageId: v.union(v.id('_storage'), v.null()),
    transcription: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError('Not logged in')
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), identity.email))
      .collect()

    if (user.length === 0) {
      throw new ConvexError('User not found')
    }

    const podcast = await ctx.db.insert('podcasts', {
      ...args,
      user: user[0]._id,
      author: user[0].name,
      authorId: user[0].clerkId,
      authorImageUrl: user[0].imageUrl
    })

    return podcast
  }
})

export const getTrendingPodcasts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('podcasts').collect()
  }
})

export const getLatestPodcasts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('podcasts').order('desc').take(10)
  }
})

export const getPodcastById = query({
  args: { podcastId: v.id('podcasts') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.podcastId)
  }
})

export const getPodcastByVoiceType = query({
  args: {
    podcastId: v.id('podcasts')
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)

    return await ctx.db
      .query('podcasts')
      .filter((q) =>
        q.and(
          q.eq(q.field('voiceType'), podcast?.voiceType),
          q.neq(q.field('_id'), args.podcastId)
        )
      )
      .collect()
  }
})

export const deletePodcast = mutation({
  args: {
    podcastId: v.id('podcasts'),
    imageStorageId: v.id('_storage'),
    audioStorageId: v.id('_storage')
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)

    if (!podcast) {
      throw new ConvexError('Podcast not found')
    }

    await ctx.storage.delete(args.imageStorageId)
    await ctx.storage.delete(args.audioStorageId)
    return await ctx.db.delete(args.podcastId)
  }
})

export const getPodcastBySearch = query({
  args: {
    search: v.string()
  },
  handler: async (ctx, args) => {
    if (args.search === '') {
      return await ctx.db.query('podcasts').order('desc').collect()
    }

    const authorSearch = await ctx.db
      .query('podcasts')
      .withSearchIndex('search_author', (q) => q.search('author', args.search))
      .take(10)

    if (authorSearch.length > 0) {
      return authorSearch
    }

    const titleSearch = await ctx.db
      .query('podcasts')
      .withSearchIndex('search_title', (q) =>
        q.search('podcastTitle', args.search)
      )
      .take(10)

    if (titleSearch.length > 0) {
      return titleSearch
    }

    return await ctx.db
      .query('podcasts')
      .withSearchIndex('search_body', (q) =>
        q.search('podcastDescription' || 'podcastTitle', args.search)
      )
      .take(10)
  }
})

export const getPodcastByUserId = query({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('podcasts')
      .filter((q) => q.eq(q.field('authorId'), args.userId))
      .collect()
  }
})

export const getPopularPodcastByUserId = query({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db
      .query('podcasts')
      .filter((q) => q.eq(q.field('authorId'), args.userId))
      .collect()
    return podcast.reduce(
      (max, obj) => (obj.views > max.views ? obj : max),
      podcast[0]
    )
  }
})

export const increaseViews = mutation({
  args: {
    podcastId: v.id('podcasts')
  },
  handler: async (ctx, args) => {
    const podcast = await ctx.db.get(args.podcastId)
    if (!podcast) {
      throw new ConvexError('Podcast not found')
    }
    return await ctx.db.patch(args.podcastId, {
      views: podcast?.views + 1
    })
  }
})
