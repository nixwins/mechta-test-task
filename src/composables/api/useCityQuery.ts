import { fakeCities } from '@/api'
import { useHttpClient } from '@/composables'
import type { City } from '@/types'
import type { ResponseSchema } from '@/types/ResponseSchema.type'

export function useCityQuery() {
  async function searchCityByName(search: string): Promise<ResponseSchema<City[]>> {
    const { data, status } = await useHttpClient({ url: '/delivery/check', params: { search } })

    if (status !== 200) {
      return { status: 'error', data }
    }

    return { status: 'success', data }
  }

  async function getPopularCities(): Promise<ResponseSchema<City[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          data: fakeCities.slice(2, 10)
        })
      }, 2000)
    })
  }

  async function mockSearchCityByName(search: string): Promise<ResponseSchema<City[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          data: fakeCities.filter((c) =>
            c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        })
      }, 300)
    })
  }

  return {
    searchCityByName,
    mockSearchCityByName,
    getPopularCities
  }
}
