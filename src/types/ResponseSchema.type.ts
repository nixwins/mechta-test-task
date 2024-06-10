export type ResponseSchema<T> = {
  status: 'success' | 'error'
  data: T
}
