import { Label } from '../ui/label'
import Image from 'next/image'
import { User } from 'lucide-react'
import { Input } from '../ui/input'
import { UserAvatarUploaderProps } from '@/types'

const UserAvatarUploader = ({
  imageUrl,
  selectedImage,
  setSelectedImage
}: UserAvatarUploaderProps) => {
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setSelectedImage(e.currentTarget.files[0])
    }
  }

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="avatar" className="text-right">
        Avatar
      </Label>
      <Label
        htmlFor="avatar"
        className="border-input hover:ring-ring ring-offset-background relative col-span-3 h-40 w-full cursor-pointer overflow-hidden rounded-md border hover:outline-none hover:ring-2 hover:ring-offset-2"
      >
        {imageUrl ? (
          <Image
            src={selectedImage ? URL.createObjectURL(selectedImage) : imageUrl}
            alt="avatar"
            fill={true}
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center">
            <User className="size-40" />
          </div>
        )}
      </Label>
      <Input
        type="file"
        className="hidden"
        id="avatar"
        onChange={handleImageChange}
      />
    </div>
  )
}

export default UserAvatarUploader
