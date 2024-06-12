import type { DeliveryType } from './DeliveryType.type'

export type City = {
  id: number
  name: string
  type: DeliveryType
  price: number
}
