import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { TransactionsRowProps } from '@/types'

const TransactionsRow = ({
  userName,
  userEmail,
  status,
  creationTime,
  amount
}: TransactionsRowProps) => {
  const isPending = status === 'pending' || status === undefined

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{userName}</div>
        <div className="text-muted-foreground hidden text-sm md:inline">
          {userEmail}
        </div>
      </TableCell>
      <TableCell className="table-cell">
        <Badge
          className={cn('border-green-500 text-xs capitalize', {
            'border-primary': isPending
          })}
          variant="outline"
        >
          {isPending ? 'pending' : status}
        </Badge>
      </TableCell>
      <TableCell className="table-cell">
        {new Date(creationTime).toLocaleDateString('en-US')}
      </TableCell>
      <TableCell className="text-right">${amount}</TableCell>
    </TableRow>
  )
}

export default TransactionsRow
