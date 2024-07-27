import { Id } from '@/convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import { ConvexAuthState } from 'convex/react'
import { EmptyObject } from 'react-hook-form'

type PodcastLabels = 'trending' | 'similar'

type PodcastParams = {
  [key: string]: Id<'podcasts'>
}

type PodcastQueryParams = EmptyObject | 'skip' | undefined | PodcastParams

export interface GeneratePodcastProps {
  voiceType: string
  setAudio: Dispatch<SetStateAction<string>>
  audio: string
  setAudioStorageId: Dispatch<SetStateAction<Id<'_storage'> | null>>
  voicePrompt: string
  setVoicePrompt: Dispatch<SetStateAction<string>>
  setAudioDuration: Dispatch<SetStateAction<number>>
}

export interface GenerateThumbnailProps {
  setImageUrl: Dispatch<SetStateAction<string>>
  imageUrl: string
  setImageStorageId: Dispatch<SetStateAction<Id<'_storage'> | null>>
  imagePrompt: string
  setImagePrompt: Dispatch<SetStateAction<string>>
}

export interface PodcastListProps {
  renderTitle: () => React.ReactNode
  renderEmptyState?: () => React.ReactNode
  label: PodcastLabels
  queryParams?: PodcastQueryParams
}

export interface PodcastBoxProps {
  _id: Id<'podcasts'>
  podcastTitle: string
  podcastDescription: string
  imageUrl: string
}

export interface DetailsPageProps {
  params: { podcastId: Id<'podcasts'> }
}

export interface PodcastDetailPlayerProps {
  isOwner: boolean
  audioUrl: string
  podcastTitle: string
  author: string
  imageUrl: string
  podcastId: Id<'podcasts'>
  imageStorageId: Id<'_storage'> | null
  audioStorageId: Id<'_storage'> | null
  authorImageUrl?: string
  authorId: string
}
