import { Protect } from '@clerk/nextjs'
import React from 'react'

const ProtectedPermissionWrap = ({
  condition,
  children,
  ...props
}: {
  condition: boolean
  children: React.ReactNode
}) =>
  condition ? (
    <Protect permission="org:dashboard:view" {...props}>
      {children}
    </Protect>
  ) : (
    children
  )

export default ProtectedPermissionWrap
