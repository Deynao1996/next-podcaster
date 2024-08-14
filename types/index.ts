import { Id } from '@/convex/_generated/dataModel'
import { Dispatch, SetStateAction } from 'react'
import { EmptyObject } from 'react-hook-form'

type PodcastLabels = 'trending' | 'similar' | 'discover' | 'user'

type PodcastParams = {
  [key: string]: string
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
  transcription: string
  setTranscription: Dispatch<SetStateAction<string>>
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
  blurhash: string
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

export interface TopPodcasterProps {
  name: string
  totalPodcasts: number
  imageUrl?: string
  clerkId: string
  totalViews: number
}

export interface PopularPodcastProps extends TopPodcasterProps {
  podcast: {
    podcastTitle: string
    pocastId: Id<'podcasts'>
  }[]
  _id: Id<'users'>
  _creationTime: number
  email: string
}

export interface AudioProps {
  title: string
  audioUrl: string
  imageUrl: string
  author: string
  podcastId: Id<'podcasts'>
}

export interface AudioContextType {
  audio: AudioProps | null
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | null>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export interface LatestPodcastProps {
  i: number
  imageUrl: string
  author: string
  views: number
  audioDuration: number
  podcastTitle: string
  _id: Id<'podcasts'>
  _creationTime: number
  audioUrl: string
}

export interface SearchBarProps {
  href: 'discover' | 'discover/podcasters'
}

export interface ImageUploaderProps extends GenerateThumbnailProps {
  isThumbnailGenerating: boolean
  setIsThumbnailGenerating: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CustomSkeletonProps {
  type: 'podcasts'
  count?: number
}
