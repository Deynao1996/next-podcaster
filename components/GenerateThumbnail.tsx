import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const GenerateThumbnail = () => {
  return (
    <Tabs defaultValue="image">
      <TabsList className="bg-background mb-5">
        <TabsTrigger value="thumbnail-prompt">
          AI prompt to generate thumbnail
        </TabsTrigger>
        <TabsTrigger value="image">Upload custom image</TabsTrigger>
      </TabsList>
      <TabsContent value="thumbnail-prompt">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="thumbnail-prompt">
            AI prompt to generate thumbnail
          </Label>
          <Input
            type="title"
            id="thumbnail-prompt"
            placeholder="Write a prompt to generate custom thumbnail"
          />
        </div>
      </TabsContent>
      <TabsContent value="image">
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="bg-background hover:border-primary flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default GenerateThumbnail
