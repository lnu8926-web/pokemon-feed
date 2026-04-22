import { useState, useEffect, useRef } from 'react'

export function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecuted.current)

    if (remaining <= 0) {
      // 딜레이 지났으면 바로 실행
      lastExecuted.current = now
      setThrottledValue(value)
    } else {
      // 남은 시간 후에 실행
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, remaining)

      return () => clearTimeout(timer)
    }
  }, [value, delay])

  return throttledValue
}