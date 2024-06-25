'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Loading from '@/app/loading'
import { ROUTES_APP } from '@/constants'
import { updateOrderStatus } from '@/services/order-service'

const VerifyPayment = () => {
  const [isVerifying, setIsVerifying] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      updatePaymentStatus()
    } else {
      router.push(ROUTES_APP.PROFILE)
    }
  }, [orderId])

  const updatePaymentStatus = async () => {
    setIsVerifying(true)
    // Call API to verify payment status
    const res = await updateOrderStatus(orderId, { status: 'paid' })
    if (res) {
      console.log('Payment verified successfully')
      router.push(`${ROUTES_APP.CHECKOUT}?id=${orderId}&isPaid=true`)
    } else {
      console.log('Payment failed')
      router.push(`${ROUTES_APP.PROFILE}`)
    }
    setIsVerifying(false)
  }

  if (isVerifying) return <Loading />
  return null
}

export default VerifyPayment
