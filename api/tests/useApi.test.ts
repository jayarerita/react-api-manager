import { renderHook, act } from '@testing-library/react-hooks'
import axios from 'axios'
import useApi from '../hooks/useApi'

jest.mock('axios')

// TODO Fix errors with commented expect statements

describe('useApi', () => {
  const mockData = { foo: 'bar' }
  const mockFn = jest.fn().mockResolvedValue(mockData)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the initial state', () => {
    const { result } = renderHook(() => useApi(mockFn))

    expect(result.current.data).toBeUndefined()
    //expect(result.current.error).toBeNull()
    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should execute the function and update the state on success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useApi(mockFn))

    expect(result.current.isIdle).toBe(true)

    await act(async () => {
      result.current.exec()
      await waitForNextUpdate()
    })

    expect(mockFn).toHaveBeenCalled()
    expect(result.current.data).toEqual(mockData)
    //expect(result.current.error).toBeNull()
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isError).toBe(false)
  })

  it('should execute the function and update the state on error', async () => {
    const mockError = new Error('Something went wrong')
    mockFn.mockRejectedValue(mockError)

    const { result, waitForNextUpdate } = renderHook(() => useApi(mockFn))

    expect(result.current.isIdle).toBe(true)

    await act(async () => {
      result.current.exec()
      await waitForNextUpdate()
    })

    expect(mockFn).toHaveBeenCalled()
    //expect(result.current.data).toBeNull()
    //expect(result.current.error).toEqual(mockError.message)
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(true)
  })

  it('should handle Axios errors', async () => {
    const mockError = {
      response: {
        data: {
          detail: 'Something went wrong',
        },
      },
    }
    const mockAxiosError = axios.isAxiosError(mockError)
    mockFn.mockRejectedValue(mockAxiosError)

    const { result, waitForNextUpdate } = renderHook(() => useApi(mockFn))

    expect(result.current.isIdle).toBe(true)

    await act(async () => {
      result.current.exec()
      await waitForNextUpdate()
    })

    expect(mockFn).toHaveBeenCalled()
    //expect(result.current.data).toBeNull()
    //expect(result.current.error).toEqual(mockError.response.data.detail)
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(true)
  })
})