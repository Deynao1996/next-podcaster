import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { ImageUploaderProps } from '@/types'

const ImageUploader = ({
  isThumbnailGenerating,
  setIsThumbnailGenerating,
  setImagePrompt,
  setImageStorageId,
  setImageUrl,
  imageUrl
}: ImageUploaderProps) => {
  const { toast } = useToast()
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload } = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl)
  const [fileEnter, setFileEnter] = useState(false)

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
    isEnter: boolean
  ) {
    e.preventDefault()
    setFileEnter(isEnter)
  }

  async function handleDataTransfer(item: DataTransferItem) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file) {
        const blob = await file.arrayBuffer().then((buffer) => {
          return new Blob([buffer])
        })
        await handleImage(blob, file.name)
      }
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setFileEnter(false)
    if (e.dataTransfer.items) {
      Array.from(e.dataTransfer.items).forEach(handleDataTransfer)
    }
  }

  async function handleImage(blob: Blob, fileName: string) {
    setIsThumbnailGenerating(true)
    setImagePrompt('')

    try {
      const file = new File([blob], fileName, {
        type: 'image/png'
      })
      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId
      setImageStorageId(storageId)

      const imageUrl = await getImageUrl({ storageId })
      setImageUrl(imageUrl!)
      toast({ title: 'Thumbnail generated successfully' })
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Error generating thumbnail'
      })
    } finally {
      setIsThumbnailGenerating(false)
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    try {
      const files = e.target.files
      if (!files) return

      const file = files[0]
      const blob = await file.arrayBuffer().then((buffer) => {
        return new Blob([buffer])
      })
      handleImage(blob, file.name)
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Error uploading image'
      })
    }
  }

  return (
    <>
      <div
        className="flex w-full flex-wrap items-center justify-center gap-1"
        onDragOver={(e) => handleDragOver(e, true)}
        onDragLeave={(e) => {
          setFileEnter(false)
        }}
        onDragEnd={(e) => handleDragOver(e, false)}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className={cn(
            'bg-background flex h-64 w-full min-w-[281px] flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed',
            {
              'hover:border-primary': !isThumbnailGenerating,
              'border-primary': fileEnter
            }
          )}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {isThumbnailGenerating ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Loader size={20} className="animate-spin" />
                <p className="text-muted-foreground text-sm">Uploading</p>
              </div>
            ) : (
              <>
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-primary font-semibold">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={uploadImage}
          />
        </label>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Thumbnail"
            width={256}
            height={256}
            className="h-64 w-64 rounded-lg object-cover"
          />
        )}
      </div>
    </>
  )
}

export default ImageUploader
