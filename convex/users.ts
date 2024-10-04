import { ConvexError, v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'
import { GenericMutationCtx, GenericQueryCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'
import { isDateFilterValid, setDateFilterRange } from './payments'

async function filterUsersByDate(
  ctx: GenericQueryCtx<DataModel>,
  dateFilter: string,
  num?: number
) {
  const { startRange, endRange } = setDateFilterRange(dateFilter)
  return await ctx.db
    .query('users')
    .order('desc')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startRange),
        q.lt(q.field('_creationTime'), endRange)
      )
    )
    .take(num ? num : 1000)
}

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

export const getUsersList = query({
  args: {
    num: v.optional(v.number()),
    dateFilter: v.optional(v.string()),
    sort: v.optional(v.union(v.literal('fulfilled'), v.literal('oldest')))
  },
  handler: async (ctx, { num, dateFilter, sort }) => {
    // await checkDashboardViewPermission(ctx)

    let users = await ctx.db.query('users').take(1)
    if (!dateFilter || !isDateFilterValid(dateFilter) || dateFilter === 'all') {
      users = await ctx.db.query('users').order('desc').collect()
    } else {
      users = await filterUsersByDate(ctx, dateFilter, num)
    }

    //Sort by query params
    if (sort === 'oldest') {
      users = users.sort((a, b) => {
        if (a._creationTime > b._creationTime) return 1
        if (a._creationTime < b._creationTime) return -1
        return 0
      })
    } else {
      users = users
    }

    const verifiedUsers = users.map(({_creationTime, _id, clerkId, email, name, imageUrl}) => ({
      creationTime: _creationTime,
      _id,
      clerkId,
      email,
      name,
      imageUrl,
      isVerified: true
    }))
    return verifiedUsers
  }
})
