import { type ClassValue, clsx } from 'clsx'
import { ConvexError } from 'convex/values'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export function getFirstTwoLetters(str: string) {
  return str.substring(0, 2).toUpperCase()
}
