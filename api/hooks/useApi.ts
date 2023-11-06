import { useState } from 'react'
import { useApiStatus } from './useApiStatus.ts'
import { PENDING, SUCCESS, ERROR } from '../constants/apiStatus.ts'
import {isAxiosError, AxiosError} from 'axios'

type Config = {
  initialData?: any
}

export default function useApi (
  fn: (...args: any[]) => Promise<any>,
  config: Config = {}
) {
  const { initialData } = config as Config
  const [data, setData] = useState(initialData)
  const [error, setError] = useState<any | null>()
  const { apiStatus, setApiStatus, ...normalisedStatuses } = useApiStatus()

  const exec = async (...args: any[]) => {
    try {
      setError(null)
      setApiStatus(PENDING)
      console.log("exec", ...args)
      const result = await fn(...args)
      console.log("response", result)
      setData(result)
      setApiStatus(SUCCESS)
      return {
        data,
        error: null,
      }
    } catch (error: unknown | Error | AxiosError) {
      console.log("isAxiosError(error)", isAxiosError(error))
      if (isAxiosError(error)) {
        // Access to config, request and response
        if (error.response && error.response.data && typeof error.response.data === 'object' && 'detail' in error.response.data) {
          console.log("AxiosError")
          console.log("error.data.detail", error.response.data.detail)
          console.log("error.data",error.response.data)
          console.log("error.response",error.response)
          setError(error.response.data.detail)
        } else {
          console.log("AxiosError, but no error.response.data.detail")
          console.log("error.message", error.message)
          console.log("error.response.data",error.response?.data)
          // Not sure this will ever be hit since AxiosError has a defined interface with all of the above
          setError(error.message)
        }
      } else if (error instanceof Error) {
        (error: Error) => {
          // Stock TypeScript errors
          console.log("Stock Error")
          console.log("error.message", error.message)
          setError(error.message)
        }
      } else {
        // Other errors
        console.log("Other Error")
        console.log("error", error)
        setError(error)
      }
      setApiStatus(ERROR)
      return {
        error,
        data: null,
      }
    }
  }
  return ({
    data,
    setData,
    apiStatus,
    setApiStatus,
    error,
    exec,
    ...normalisedStatuses as {
      isIdle: boolean;
      isPending: boolean;
      isSuccess: boolean;
      isError: boolean;
    },
  })
}