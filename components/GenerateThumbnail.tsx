import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { GenerateThumbnailProps } from '@/types'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import CreateImageUploader from './imageUploaderUI/CreateImageUploader'

const GenerateThumbnail = ({
  setImageUrl,
  setImageStorageId,
  imageUrl,
  imagePrompt,
  setImagePrompt
}: GenerateThumbnailProps) => {
  const { toast } = useToast()
  const [isThumbnailGenerating, setIsThumbnailGenerating] = useState(false)

  function generateImage() {
    //TODO Implement generate image from Stable Diffusion

    toast({ title: 'Functionality coming soon' })
  }

  return (
    <Tabs defaultValue="image">
      <TabsList className="bg-background mb-5">
        <TabsTrigger value="thumbnail-prompt">AI prompt</TabsTrigger>
        <TabsTrigger value="image">Upload custom image</TabsTrigger>
      </TabsList>
      <TabsContent value="thumbnail-prompt">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="thumbnail-prompt truncate">AI prompt</Label>
          <Textarea
            className="resize-none"
            placeholder="Write a prompt to generate custom thumbnail"
            onChange={(e) => setImagePrompt(e.target.value)}
            value={imagePrompt}
          />
        </div>
        <Button
          type="button"
          aria-label="Generate Podcast"
          className="mt-2"
          size={'sm'}
          onClick={() => generateImage()}
          disabled={true}
        >
          {isThumbnailGenerating ? (
            <>
              Generating
              <Loader size={20} className="ml-2 animate-spin" />
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </TabsContent>
      <TabsContent value="image">
        <CreateImageUploader
          {...{
            isThumbnailGenerating,
            setIsThumbnailGenerating,
            setImagePrompt,
            setImageStorageId,
            setImageUrl,
            imageUrl,
            imagePrompt
          }}
        />
      </TabsContent>
    </Tabs>
  )
}

export default GenerateThumbnail
