'use node'

import { v } from 'convex/values'
import { action, internalAction } from './_generated/server'
import { encode } from 'blurhash'
import Jimp from 'jimp'

async function encodeImage(imageUrl: string) {
  const image = await Jimp.read(imageUrl)
  const width = image.bitmap.width
  const height = image.bitmap.height
  const imageData = new Uint8ClampedArray(image.bitmap.data.buffer)
  const blurhash = encode(imageData, width, height, 4, 4)
  return blurhash
}

export const encodeImageToBlurhash = action({
  args: { imageUrl: v.string() },
  handler: async (_, { imageUrl }) => {
    const encodedImage = await encodeImage(imageUrl)
    return encodedImage
  }
})

export const internalImageToBlurhash = internalAction({
  args: { imageUrl: v.string() },
  handler: async (_, { imageUrl }) => {
    const encodedImage = await encodeImage(imageUrl)
    return encodedImage
  }
})
