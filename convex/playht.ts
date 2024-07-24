'use node'

import * as PlayHT from 'playht'
import { action } from './_generated/server'
import { v } from 'convex/values'
import { DEFAULT_VOICE_ID, voiceCategories } from '@/constants'

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { input, voice }) => {
    PlayHT.init({
      apiKey: process.env.PLAYHT_SECRET_KEY as string,
      userId: process.env.PLAYHT_USER_ID as string,
      defaultVoiceId: DEFAULT_VOICE_ID,
      defaultVoiceEngine: 'PlayHT2.0'
    })

    const voiceId =
      voiceCategories.find((v) => v.voice === voice)?.voiceId ||
      DEFAULT_VOICE_ID

    const generated = await PlayHT.generate(input, {
      voiceEngine: 'PlayHT2.0',
      voiceId,
      outputFormat: 'mp3',
      temperature: 1.5,
      quality: 'high',
      speed: 0.8
    })
    const { audioUrl } = generated
    return audioUrl
  }
})
