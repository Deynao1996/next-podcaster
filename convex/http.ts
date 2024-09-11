// ===== reference links =====
// https://www.convex.dev/templates (open the link and choose for clerk than you will get the github link mentioned below)
// https://github.dev/webdevcody/thumbnail-critique/blob/6637671d72513cfe13d00cb7a2990b23801eb327/convex/schema.ts

import type { WebhookEvent } from '@clerk/nextjs/server'
import { GenericActionCtx, httpRouter } from 'convex/server'
import { Webhook } from 'svix'
import { clerkClient } from '@clerk/clerk-sdk-node'

import { internal } from './_generated/api'
import { httpAction } from './_generated/server'

type UserUpdate = {
  ctx: GenericActionCtx<any>
  event: WebhookEvent
}

async function createDefaultPlan(userId: string, ctx: GenericActionCtx<any>) {
  const defaultPlan = {
    userId,
    name: 'free' as const,
    interval: 'no' as const,
    tokens: 150,
    startTime: Date.now(),
    endTime: 0
  }
  await ctx.runMutation(internal.plans.create, defaultPlan)
}

async function createBlurhash(imageUrl: string, ctx: GenericActionCtx<any>) {
  const blurhash = await ctx.runAction(
    internal.blurhash.internalImageToBlurhash,
    {
      imageUrl
    }
  )
  return blurhash
}

async function handleUserCreated({
  userId,
  ctx,
  event
}: UserUpdate & { userId: string }) {
  if (event.type === 'user.created') {
    const blurhash = await createBlurhash(event.data.image_url, ctx)

    await ctx.runMutation(internal.users.createUser, {
      clerkId: userId,
      email: event.data.email_addresses[0].email_address,
      imageUrl: event.data.image_url,
      blurhash,
      name: event.data.first_name as string
    })
  }
}

async function handleUserUpdate({ ctx, event }: UserUpdate) {
  if (event.type === 'user.updated') {
    const blurhash = await createBlurhash(event.data.image_url, ctx)

    await ctx.runMutation(internal.users.updateUserInternal, {
      clerkId: event.data.id,
      imageUrl: event.data.image_url,
      blurhash,
      email: event.data.email_addresses[0].email_address
    })
  }
}

async function addUserToOrganization(userId: string) {
  await clerkClient.organizations.createOrganizationMembership({
    organizationId: process.env.ORGANIZATION_ID as string,
    userId: userId,
    role: 'member'
  })
}

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request)
  if (!event) {
    return new Response('Invalid request', { status: 400 })
  }
  switch (event.type) {
    case 'user.created':
      const userId = event.data.id

      await handleUserCreated({ userId, ctx, event })
      await createDefaultPlan(userId, ctx)
      await addUserToOrganization(userId)
      break
    case 'user.updated':
      await handleUserUpdate({ ctx, event })
      break
    case 'user.deleted':
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string
      })
      break
  }
  return new Response(null, {
    status: 200
  })
})

const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: handleClerkWebhook
})

http.route({
  path: '/stripe',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const signature: string = request.headers.get('stripe-signature') as string
    const result = await ctx.runAction(internal.stripe.fulfill, {
      signature,
      payload: await request.text()
    })

    if (result.success) {
      return new Response(null, {
        status: 200
      })
    } else {
      return new Response('Webhook Error', {
        status: 400
      })
    }
  })
})

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  // key note : add the webhook secret variable to the environment variables field in convex dashboard setting
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!
  if (!webhookSecret) {
    throw new Error('CLERK_WEBHOOK_SECRET is not defined')
  }
  const payloadString = await req.text()
  const headerPayload = req.headers
  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!
  }
  const wh = new Webhook(webhookSecret)
  const event = wh.verify(payloadString, svixHeaders)
  return event as unknown as WebhookEvent
}

export default http
