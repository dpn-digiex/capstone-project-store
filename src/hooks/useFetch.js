import { useEffect, useRef, useState } from 'react'

const useFetch = (serviceCallback, revalidateKey) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [response, setResponse] = useState()
  const rerenderRef = useRef(false)
  const callbackRef = useRef(serviceCallback)

  const handleSetData = (data) => {
    if (data === null || data === undefined) return setError('Something went wrong!')
    return setResponse(data)
  }

  useEffect(() => {
    callbackRef.current = serviceCallback
  }, [serviceCallback])

  useEffect(() => {
    if (rerenderRef.current === false || revalidateKey) {
      const getService = async () => {
        try {
          setIsLoading(true)
          const data = await callbackRef.current?.()

          if (data === null) return setError(data.message)
          setResponse(data)
          setError(null)
        } catch (error) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }
      getService()
    }
    return () => (rerenderRef.current = true)
  }, [revalidateKey])

  return {
    isLoading,
    error,
    response,
    setResponse: handleSetData
  }
}

export default useFetch
