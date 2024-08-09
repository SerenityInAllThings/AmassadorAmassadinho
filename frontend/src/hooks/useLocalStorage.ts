import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

const debounceTime = 500 // Change this to 0 for testing

const useLocalStorage = (
  key: string,
  defaultValue = "",
): [string, Dispatch<SetStateAction<string>>, () => void] => {
  // Inicializa valor com o valor atual do storage ou o valor default
  const stored = localStorage.getItem(key)
  if (stored == null) localStorage.setItem(key, defaultValue)
  const [value, setValue] = useState<string>(stored || defaultValue)
  const isFirstRun = useRef(true)

  // Se a chave mudar, mudamos o valor
  useEffect(
    () => setValue(localStorage.getItem(key) || defaultValue),
    [key, defaultValue],
  )

  // Resposta ao evento de atualização de valor diretamento no localstorage
  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key !== key || event.newValue === value) return

      setValue(event.newValue || defaultValue)
    }

    window.addEventListener("storage", onStorageChange)
    return () => window.removeEventListener("storage", onStorageChange)
  }, [key, value, defaultValue])

  // Timer para reagir a mudança de estado e mudar o valor no local storage
  useEffect(() => {
    const dispatchStorageChange = (newValue: string | null) =>
      window.dispatchEvent(new StorageEvent("storage", { key, newValue }))

    if (isFirstRun.current) {
      isFirstRun.current = false
      return undefined
    }

    const timer = setTimeout(() => {
      if (value === null || value === undefined) {
        localStorage.removeItem(key)
        dispatchStorageChange(null)
      } else if (value !== localStorage.getItem(key)) {
        localStorage.setItem(key, value)
        dispatchStorageChange(value)
      }
    }, debounceTime)

    return () => clearTimeout(timer)
  }, [key, value])

  const removeValue = useCallback(() => setValue(defaultValue), [defaultValue])
  return [value, setValue, removeValue]
}

const useBooleanLocalStorage = (
  key: string,
  defaultValue: boolean,
): [boolean, (newValue: boolean) => void, () => void] => {
  const [rawValue, setStringValue, removeValue] = useLocalStorage(
    key,
    defaultValue.toString(),
  )
  const value = rawValue === "true"
  const setValue = useCallback(
    (updated: boolean) => setStringValue(updated.toString()),
    [setStringValue],
  )
  return [value, setValue, removeValue]
}

const useNumericLocalStorage = (
  key: string,
  defaultValue?: number,
): [number, (newValue: number) => void, () => void] => {
  const [rawValue, setStringValue, removeValue] = useLocalStorage(
    key,
    defaultValue?.toString(),
  )
  const value = Number(rawValue)
  const setValue = useCallback(
    (updated: number) => setStringValue(updated.toString()),
    [setStringValue],
  )
  return [value, setValue, removeValue]
}

const useObjectLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T, (newValue: T) => void, () => void] => {
  const [rawValue, setStringValue, removeValue] = useLocalStorage(
    key,
    JSON.stringify(defaultValue),
  )
  const value: T = rawValue ? JSON.parse(rawValue) : undefined
  const setValue = useCallback(
    (updated: T) => setStringValue(JSON.stringify(updated)),
    [setStringValue],
  )
  return [value, setValue, removeValue]
}

const useDateLocalStorage = (
  key: string,
  defaultValue: Date,
): [Date, (newValue: Date) => void, () => void] => {
  const [rawValue, setStringValue, removeValue] = useLocalStorage(
    key,
    defaultValue.toISOString(),
  )
  const value = rawValue ? new Date(rawValue) : defaultValue
  const setValue = useCallback(
    (updated: Date) => setStringValue(updated.toISOString()),
    [setStringValue],
  )
  return [value, setValue, removeValue]
}

export {
  useLocalStorage,
  useBooleanLocalStorage,
  useNumericLocalStorage,
  useObjectLocalStorage,
  useDateLocalStorage,
}
