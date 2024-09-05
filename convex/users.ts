import { ConvexError, v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'
import { GenericMutationCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'

const updateUser = async (
  ctx: GenericMutationCtx<DataModel>,
  args: {
    clerkId: string
    imageUrl: string
    email: string
  }
) => {
  {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email
    })

    const podcast = await ctx.db
      .query('podcasts')
      .filter((q) => q.eq(q.field('authorId'), args.clerkId))
      .collect()

    await Promise.all(
      podcast.map(async (p) => {
        await ctx.db.patch(p._id, {
          authorImageUrl: args.imageUrl
        })
      })
    )
  }
}

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    return user
  }
})

export const getTopUserByPodcastCount = query({
  args: {
    search: v.string(),
    length: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    let user
    if (args.search === '') {
      user = await ctx.db.query('users').collect()
    } else {
      user = await ctx.db
        .query('users')
        .withSearchIndex('search_name', (q) => q.search('name', args.search))
        .collect()
    }

    if (user.length > 0) {
      const userData = await Promise.all(
        user.map(async (u) => {
          const podcasts = await ctx.db
            .query('podcasts')
            .filter((q) => q.eq(q.field('authorId'), u.clerkId))
            .collect()

          const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views)
          const totalViews = sortedPodcasts.reduce(
            (acc, podcast) => acc + podcast.views,
            0
          )

          return {
            ...u,
            totalPodcasts: podcasts.length,
            totalViews,
            podcast: sortedPodcasts.map((p) => ({
              podcastTitle: p.podcastTitle,
              pocastId: p._id
            }))
          }
        })
      )

      return userData
        .sort((a, b) => b.totalViews - a.totalViews)
        .slice(0, args.length ? args.length : userData.length)
    }
    return []
  }
})

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    blurhash: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      blurhash: args.blurhash
    })
  }
})

export const updateUserInternal = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    blurhash: v.string()
  },
  async handler(ctx, args) {
    return await updateUser(ctx, args)
  }
})

export const updateUserSettings = mutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    blurhash: v.string()
  },
  async handler(ctx, args) {
    return await updateUser(ctx, args)
  }
})

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    await ctx.db.delete(user._id)
  }
})

export const getUserBySearch = query({
  args: {
    search: v.string()
  },
  handler: async (ctx, args) => {
    if (args.search === '') {
      return await ctx.db.query('users').order('desc').collect()
    }

    const nameSearch = await ctx.db
      .query('users')
      .withSearchIndex('search_name', (q) => q.search('name', args.search))
      .take(10)

    if (nameSearch.length > 0) {
      return nameSearch
    } else {
      return []
    }
  }
})
