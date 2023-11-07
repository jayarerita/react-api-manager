import { renderHook, act } from '@testing-library/react-hooks'
import { useApiStatus } from '../hooks/useApiStatus'
import { IDLE, PENDING, SUCCESS, ERROR } from '../constants/apiStatus'



describe('useApiStatus', () => {
  it('should return the initial status', () => {
    const { result } = renderHook(() => useApiStatus(IDLE))

    expect(result.current.apiStatus).toBe(IDLE)
    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should update the status to Pending', () => {
    const { result } = renderHook(() => useApiStatus(IDLE))

    act(() => {
      result.current.setApiStatus(PENDING)
    })

    expect(result.current.apiStatus).toBe(PENDING)
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(true)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should update the status to success', () => {
    const { result } = renderHook(() => useApiStatus(IDLE))

    act(() => {
      result.current.setApiStatus(SUCCESS)
    })

    expect(result.current.apiStatus).toBe(SUCCESS)
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isError).toBe(false)
  })

  it('should update the status to error', () => {
    const { result } = renderHook(() => useApiStatus(IDLE))

    act(() => {
      result.current.setApiStatus(ERROR)
    })

    expect(result.current.apiStatus).toBe(ERROR)
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(true)
  })
})