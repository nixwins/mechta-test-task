export function debounce<T extends (...args: any[]) => any>(
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>): void => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args)
    }, timeout)
  }
}
