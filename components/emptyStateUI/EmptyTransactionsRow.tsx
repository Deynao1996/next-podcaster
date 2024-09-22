import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

const EmptyTransactionsRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Not found</div>
      </TableCell>
      <TableCell className="table-cell">
        <Badge variant="outline">-</Badge>
      </TableCell>
      <TableCell className="table-cell">-</TableCell>
      <TableCell className="text-right">-</TableCell>
    </TableRow>
  )
}

export default EmptyTransactionsRow
