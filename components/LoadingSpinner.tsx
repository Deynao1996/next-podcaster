import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="text-primary animate-spin" size={40} />
    </div>
  )
}

export default LoadingSpinner
