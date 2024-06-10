import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutsEnum, AppLayoutToComponentMap } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const layout: AppLayoutsEnum = route.meta.layout as AppLayoutsEnum
  console.log('layout name ', layout)
  const normalizedLayoutName = layout || AppLayoutsEnum.default
  const componentName = AppLayoutToComponentMap[normalizedLayoutName]
  const fileNameWithoutExtension = componentName.split('.vue')[0]
  const component = await import(`../../layouts/${fileNameWithoutExtension}.vue`)
  route.meta.layoutComponent = component.default
}
