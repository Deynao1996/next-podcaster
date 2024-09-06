import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { useState } from 'react'

export const useUploadImage = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl)

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
    null
  )

  async function handleImage(blob: Blob, fileName: string) {
    setIsLoading(true)

    try {
      const file = new File([blob], fileName, {
        type: 'image/png'
      })
      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId
      setImageStorageId(storageId)

      const imageUrl = await getImageUrl({ storageId })
      setImageUrl(imageUrl!)
      toast({ title: 'Image generated successfully' })
      return imageUrl
    } catch (error) {
      if (error instanceof ConvexError) {
        toast({
          variant: 'destructive',
          title: error.data
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong. Please try again later.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleImage,
    isLoading,
    imageUrl,
    imageStorageId
  }
}
