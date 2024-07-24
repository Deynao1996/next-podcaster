import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { GeneratePodcastProps } from '@/types'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useCreatePodcast } from '@/hooks/useCreatePodcast'

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { audio, setAudioDuration, voicePrompt, setVoicePrompt } = props
  const { createPodcast, isGenerating } = useCreatePodcast(props)

  return (
    <div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="promptAi">AI prompt to generate podcast</Label>
        <Textarea
          className="resize-none"
          placeholder="Provide text to AI to generate audio"
          onChange={(e) => setVoicePrompt(e.target.value)}
          id="promptAi"
          value={voicePrompt}
        />
      </div>
      <Button
        type="button"
        aria-label="Generate Podcast"
        className="mt-3"
        size={'sm'}
        onClick={createPodcast}
        disabled={isGenerating}
      >
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
          className="mt-2"
          autoPlay
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast
