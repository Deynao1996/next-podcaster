import { ConvexError, v } from 'convex/values'
import { action, mutation, query } from './_generated/server'
import { internal } from './_generated/api'
import { isDateFilterValid, setDateFilterRange } from './payments'
import { GenericQueryCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'

async function filterPodcastsByDate(
  ctx: GenericQueryCtx<DataModel>,
  dateFilter: string,
  num?: number
) {
  const { startRange, endRange } = setDateFilterRange(dateFilter)
  return await ctx.db
    .query('podcasts')
    .order('desc')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startRange),
        q.lt(q.field('_creationTime'), endRange)
      )
    )
    .take(num ? num : 1000)
}

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

    const currentPlan = await ctx.db
      .query('plans')
      .filter((q) => q.eq(q.field('userId'), user[0].clerkId))
      .unique()

    if (!currentPlan) throw new ConvexError('Not a plan user')
    if (currentPlan.tokens < 1) {
      throw new ConvexError('Not enough tokens. Please upgrade your plan.')
    }

    await ctx.db.patch(currentPlan._id, {
      tokens: currentPlan.tokens - 1
    })

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
    return await ctx.db.query('podcasts').order('desc').take(4)
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

export const getPodcastsList = query({
  args: {
    num: v.optional(v.number()),
    dateFilter: v.optional(v.string()),
    sort: v.optional(
      v.union(v.literal('fulfilled'), v.literal('oldest'), v.literal('views'))
    )
  },
  handler: async (ctx, { num, dateFilter, sort }) => {
    // await checkDashboardViewPermission(ctx)

    let podcasts = await ctx.db.query('podcasts').take(1)
    if (!dateFilter || !isDateFilterValid(dateFilter) || dateFilter === 'all') {
      podcasts = await ctx.db.query('podcasts').order('desc').collect()
    } else {
      podcasts = await filterPodcastsByDate(ctx, dateFilter, num)
    }

    //Sort by query params
    if (sort === 'oldest') {
      podcasts = podcasts.sort((a, b) => {
        if (a._creationTime > b._creationTime) return 1
        if (a._creationTime < b._creationTime) return -1
        return 0
      })
    } else if (sort === 'views') {
      podcasts = podcasts.sort((a, b) => {
        if (a.views > b.views) return -1
        if (a.views < b.views) return 1
        return 0
      })
    } else {
      podcasts = podcasts
    }

    const updatedPodcasts = await Promise.all(
      podcasts.map(async (p) => {
        const user = await ctx.db
          .query('users')
          .filter((q) => q.eq(q.field('clerkId'), p.authorId))
          .unique()
        if (!user) {
          throw new ConvexError('User not found')
        }

        return {
          author: user.name,
          podcastId: p._id,
          creationTime: p._creationTime,
          authorEmail: user.email,
          imageUrl: p.imageUrl,
          podcastTitle: p.podcastTitle,
          views: p.views
        }
      })
    )
    return updatedPodcasts
  }
})
