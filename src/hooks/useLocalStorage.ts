import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 초기값을 설정할 때 localStorage에 저장된 값이 있으면 그걸 써야 해. useState 초기값을 어떻게 설정하면 될까?
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // 값을 업데이트할 때 setState랑 localStorage.setItem 둘 다 해줘야 해. 이걸 하나의 함수로 묶으면?
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}