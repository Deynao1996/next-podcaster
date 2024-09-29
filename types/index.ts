import {
  dropdownPodcastsListFilters,
  dropdownTransactionListFilters
} from '@/constants'
import { Id } from '@/convex/_generated/dataModel'
import { UserIdentity } from 'convex/server'
import { Dispatch, SetStateAction } from 'react'
import { EmptyObject } from 'react-hook-form'

type PodcastLabels = 'trending' | 'similar' | 'discover' | 'user'

type PodcastParams = {
  [key: string]: string
}

type PodcastQueryParams = EmptyObject | 'skip' | undefined | PodcastParams

export type DropdownTransactionsListFilter =
  (typeof dropdownTransactionListFilters)[number]

export type DropdownPodcastsListFilter =
  (typeof dropdownPodcastsListFilters)[number]

type DropdownListFilter =
  | DropdownTransactionsListFilter
  | DropdownPodcastsListFilter

export type DateFilter = 'week' | 'month' | 'year' | 'all'

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
  imageUrl: string
  imagePrompt: string
  setImagePrompt: Dispatch<SetStateAction<string>>
  isThumbnailGenerating: boolean
  handleImage: (
    blob: Blob,
    fileName: string
  ) => Promise<string | null | undefined>
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
  blurhash: string
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
  blurhash: string
}

export interface SearchBarProps {
  href: 'discover' | 'discover/podcasters'
}

export interface ImageUploaderProps extends GenerateThumbnailProps {
  isThumbnailGenerating: boolean
}

type SkeletonType =
  | 'podcasts'
  | 'latest'
  | 'user'
  | 'slider'
  | 'top-podcasters'
  | 'profile'
  | 'stats'
  | 'subscriptions'
  | 'radial-chart'
  | 'transactions-list'
  | 'separate-stats'
  | 'pie-chart'

export interface CustomSkeletonProps {
  type: SkeletonType
  count?: number
}

export interface PricingCardProps {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: {
    text: string
    isDisadvantage?: boolean
  }[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
  userId: string
}

export interface UserSettingsContentProps {
  email?: string
  name?: string
  imageUrl?: string
  clerkId: string
}

export interface UserAvatarUploaderProps {
  imageUrl?: string
  selectedImage?: File
  setSelectedImage: Dispatch<SetStateAction<File | undefined>>
}

export interface CustomIdentity extends UserIdentity {
  membership_permission: string[]
}

interface DashboardListProps {
  showActionBtn?: boolean
  num?: number
  dateFilter?: DateFilter
}

export interface TransactionsListProps extends DashboardListProps {
  sort?: DropdownTransactionsListFilter
}

export interface PodcastsDashboardListProps extends DashboardListProps {
  sort?: DropdownPodcastsListFilter
}

export interface TransactionsRowProps {
  userName: string
  userEmail: string
  status?: 'pending' | 'paid'
  creationTime: number
  amount: number
}

export interface PodcastsRowProps {
  author: string
  creationTime: number
  imageUrl: string
  podcastTitle: string
  views: number
  authorEmail: string
}

export interface EmptyPodcastListProps {
  children?: React.ReactNode
  title: string
  subtitle?: string
}

export interface SeparatePieChartStatsProps {
  currentMonthTotal: number
  previousMonthTotal: number
}

export interface SeparateStatsProps extends SeparatePieChartStatsProps {
  currentMonthGoalCompare: number
  prevMonthGoalCompare: number
}

export interface DashboardStatsProps {
  title: string
  description: string
  actionHref: string
  actionTitle: string
  currentMonthValue?: number
  previousMonthValue?: number
  stats?: SeparateStatsProps
}

export interface PieStatChartProps {
  stats?: SeparatePieChartStatsProps
  title: string
  description: string
  chartLabel: string
}

export interface TabsDataTableProps<T> {
  renderTabsContentList: (dateFilter: DateFilter) => React.ReactNode
  dropdownFilter: T
  setDropdownFilter: Dispatch<SetStateAction<T>>
  filterType: 'podcasts' | 'transactions'
}
