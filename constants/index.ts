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
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Essential features you need to get started',
    features: [
      { text: '50 podcast tokens per month' },
      { text: 'Free of charge' },
      { text: 'Access to one default voice', isDisadvantage: true },
      { text: 'Basic support', isDisadvantage: true },
      { text: 'Ads may be included', isDisadvantage: true }
    ],
    actionLabel: 'Get Started'
  },
  {
    title: 'Pro',
    monthlyPrice: 25,
    yearlyPrice: 250,
    description: 'Perfect for owners of small & medium businessess',
    features: [
      { text: '500 podcast tokens per month' },
      { text: 'Access to all available voices' },
      { text: 'Higher priority support' },
      { text: '500 podcast tokens per month' },
      { text: 'Moderate price tier', isDisadvantage: true }
    ],
    actionLabel: 'Upgrade to Pro',
    popular: true
  },
  {
    title: 'Unlimited',
    monthlyPrice: 75,
    yearlyPrice: 750,
    description: 'Dedicated support and infrastructure to fit your needs',
    features: [
      { text: 'Unlimited podcast tokens' },
      { text: 'Access to all voices' },
      { text: 'Premium support' },
      { text: 'No ads' },
      { text: 'Early access to new features' }
    ],
    actionLabel: 'Go Unlimited',
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
