import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { getFirstTwoLetters } from '@/lib/utils'
import { PodcastsRowProps } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const PodcastsRow = ({
  author,
  authorEmail,
  imageUrl,
  podcastTitle,
  views,
  creationTime
}: PodcastsRowProps) => {
  const fallback = getFirstTwoLetters(podcastTitle || '')

  return (
    <TableRow>
      <TableCell className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="truncate font-medium">{podcastTitle}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{author}</div>
        <div className="text-muted-foreground hidden text-sm md:inline">
          {authorEmail}
        </div>
      </TableCell>
      <TableCell className="table-cell">
        {new Date(creationTime).toLocaleDateString('en-US')}
      </TableCell>
      <TableCell className="text-right">{views}</TableCell>
    </TableRow>
  )
}

export default PodcastsRow
