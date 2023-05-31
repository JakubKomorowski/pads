import { useEffect, useRef, useState } from 'react'

export function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(fallbackValue)
  const firstRender = useRef(true)

  const loadJSON = key => key && JSON.parse(localStorage.getItem(key))
  const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data))

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      const localItems = loadJSON(key)
      localItems && setValue(localItems)
      return
    }
    saveJSON(key, value)
    console.log(JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
