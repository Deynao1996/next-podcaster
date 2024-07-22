import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { GeneratePodcastProps } from '@/types'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useGeneratePodcast } from '@/hooks/useGeneratePodcast'

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { audio, setAudioDuration, voicePrompt } = props
  const { generatePodcast, isGenerating } = useGeneratePodcast(props)

  return (
    <div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="promptAi">AI prompt to generate podcast</Label>
        <Textarea
          className="resize-none"
          placeholder="Provide text to AI to generate audio"
          id="promptAi"
          value={voicePrompt}
        />
      </div>
      <Button aria-label="Generate Podcast" className="mt-3" size={'sm'}>
        {isGenerating ? (
          <>
            Generating
            <Loader size={20} className="ml-2 animate-spin" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      {audio && (
        <audio
          src={audio}
          controls
          autoPlay
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast
