export const DEFAULT_VOICE_ID =
  's3://voice-cloning-zero-shot/f6594c50-e59b-492c-bac2-047d57f8bdd8/susanadvertisingsaad/manifest.json'

export const sidebarLinks = (currentUserId?: string) => {
  return [
    {
      imgURL: '/icons/home.svg',
      route: '/',
      label: 'Home'
    },
    {
      imgURL: '/icons/discover.svg',
      route: '/discover',
      label: 'Discover'
    },
    {
      imgURL: '/icons/microphone.svg',
      route: '/create-podcast',
      label: 'Create Podcast'
    },
    {
      imgURL: '/icons/profile.svg',
      route: currentUserId ? `/profile/${currentUserId}` : '/profile',
      label: 'My Profile'
    },
    {
      imgURL: '/icons/price.svg',
      route: '/pricing',
      label: 'Prices'
    }
  ]
}

export const plans = [
  {
    title: 'Basic',
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: 'Essential features you need to get started',
    features: [
      'Example Feature Number 1',
      'Example Feature Number 2',
      'Example Feature Number 3'
    ],
    actionLabel: 'Get Started'
  },
  {
    title: 'Pro',
    monthlyPrice: 25,
    yearlyPrice: 250,
    description: 'Perfect for owners of small & medium businessess',
    features: [
      'Example Feature Number 1',
      'Example Feature Number 2',
      'Example Feature Number 3'
    ],
    actionLabel: 'Get Started',
    popular: true
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated support and infrastructure to fit your needs',
    features: [
      'Example Feature Number 1',
      'Example Feature Number 2',
      'Example Feature Number 3',
      'Super Exclusive Feature'
    ],
    actionLabel: 'Contact Sales',
    exclusive: true
  }
]

export const voiceCategories = [
  {
    voice: 'adolfo',
    voiceId:
      's3://voice-cloning-zero-shot/d82d246c-148b-457f-9668-37b789520891/adolfosaad/manifest.json'
  },
  {
    voice: 'charlotte',
    voiceId:
      's3://voice-cloning-zero-shot/a59cb96d-bba8-4e24-81f2-e60b888a0275/charlottenarrativesaad/manifest.json'
  },
  {
    voice: 'dylan',
    voiceId:
      's3://voice-cloning-zero-shot/3a831d1f-2183-49de-b6d8-33f16b2e9867/dylansaad/manifest.json'
  },
  {
    voice: 'susan',
    voiceId:
      's3://voice-cloning-zero-shot/f6594c50-e59b-492c-bac2-047d57f8bdd8/susanadvertisingsaad/manifest.json'
  },
  {
    voice: 'navya',
    voiceId:
      's3://voice-cloning-zero-shot/e5df2eb3-5153-40fa-9f6e-6e27bbb7a38e/original/manifest.json'
  },
  {
    voice: 'benton',
    voiceId:
      's3://voice-cloning-zero-shot/b41d1a8c-2c99-4403-8262-5808bc67c3e0/bentonsaad/manifest.json'
  }
]
