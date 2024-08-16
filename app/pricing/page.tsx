'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { plans } from '@/constants'
import PricingCard from '@/components/PricingCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type PricingSwitchProps = {
  onSwitch: (value: string) => void
}
const PricingHeader = ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="pt-1 text-xl">{subtitle}</p>
    <br />
  </section>
)

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="mx-auto w-40" onValueChange={onSwitch}>
    <TabsList className="bg-[#000103] px-2 py-6">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
)

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1)

  return (
    <div className="bg-auth-bg overlay min-h-svh bg-cover bg-center bg-no-repeat py-8">
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
        })}
      </section>
    </div>
  )
}
