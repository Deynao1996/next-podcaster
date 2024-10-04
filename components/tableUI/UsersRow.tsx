import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn, getFirstTwoLetters } from '@/lib/utils'
import { UsersRowProps } from '@/types'
import { Badge } from '../ui/badge'

const UsersRow = ({
  creationTime,
  name,
  imageUrl,
  email,
  isVerified
}: UsersRowProps) => {
  const fallback = getFirstTwoLetters(name || '')

  return (
    <TableRow>
      <TableCell className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="truncate font-medium">{name}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{email}</div>
      </TableCell>
      <TableCell className="table-cell">
        {new Date(creationTime).toLocaleDateString('en-US')}
      </TableCell>
      <TableCell className="table-cell text-right">
        <Badge
          className={cn('mr-auto border-green-500 text-xs capitalize', {
            'border-primary': !isVerified
          })}
          variant="outline"
        >
          {isVerified ? 'verified' : 'unverified'}
        </Badge>
      </TableCell>
    </TableRow>
  )
}

export default UsersRow
