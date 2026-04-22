// 값의 변화를 지연시키는 디바운스 기능 구현

// useState: 디바운스된 값을 상태로 저장하기 위해 사용
// useEffect: 값이 변할 때 타이머를 등록/취소하기 위해 사용
import { useState, useEffect } from 'react'

// <T> - 어떤 타입이든 받을 수 있게 제네릭 선언
// value: T - 디바운스할 원본 값
// delay: number = 500 - 디바운스 지연 시간 (기본값 500ms)
// : T - 입력과 같은 같은 타입의 값을 반환 
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}