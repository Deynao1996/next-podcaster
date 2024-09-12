import { DASHBOARD_PERMISSION } from '@/constants'
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
    <Protect permission={DASHBOARD_PERMISSION} {...props}>
      {children}
    </Protect>
  ) : (
    children
  )

export default ProtectedPermissionWrap
