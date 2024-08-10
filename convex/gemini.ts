import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from '@google/generative-ai'

import { action } from './_generated/server'
import { v } from 'convex/values'

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  }
]

const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY as string)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings
})

export const generateTranscription = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const refinedPrompt = `Write a podcast script about ${prompt}. Include an introduction, three main points, and a conclusion. Keep the tone informative and engaging. This should be a short script with no more than 250 words. Without any explanation or confirmation from AI response.`
    const result = await model.generateContent(refinedPrompt)
    const response = await result.response
    return response.text()
  }
})
