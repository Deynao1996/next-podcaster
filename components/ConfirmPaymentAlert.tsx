import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog'
import Confetti from 'react-confetti'
import useWindowSize from '@/hooks/useWindowSize'

const ConfirmPaymentAlert = ({ message }: { message?: string | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (message) setIsOpen(true)
  }, [message])

  return (
    <>
      {isOpen && <Confetti width={width} height={height} />}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Subscription Successful</AlertDialogTitle>
            <AlertDialogDescription>
              {message ?? 'Your payment was successful. Enjoy your new plan!'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ConfirmPaymentAlert
