import { GoogleGenerativeAI } from '@google/generative-ai'
import { action } from './_generated/server'
import { v } from 'convex/values'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY as string)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const generateTranscription = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }
})
