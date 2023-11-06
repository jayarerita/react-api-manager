import { useState, useMemo } from 'react'
import { IDLE, defaultStatuses } from '../constants/apiStatus.ts'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const prepareStatuses = (currentStatus: string) => {
  const statuses: { [key: string]: boolean } = {}

  for (const status of defaultStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase())
    const normalisedStatusKey = `is${normalisedStatus}`
    statuses[normalisedStatusKey] = status === currentStatus
  }

  return statuses
}

export const useApiStatus = (currentStatus = IDLE) => {
  const [apiStatus, setApiStatus] = useState(currentStatus)
  const statuses = useMemo(() => prepareStatuses(apiStatus), [apiStatus])

  return {
    apiStatus,
    setApiStatus,
    ...statuses,
  }
}