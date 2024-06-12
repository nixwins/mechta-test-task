<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import type { City } from '@/types'
import { useDeliveryQuery } from '@/composables'
import { useRoute, useRouter } from 'vue-router'

const TheHeader = defineAsyncComponent(() => import('@/components/TheHeader.vue'))
const PopularCities = defineAsyncComponent(() => import('@/components/PopularCities.vue'))
const AutoComplete = defineAsyncComponent(() => import('@/components/base/AutoComplete.vue'))

const { getPopularCities, mockSearchCityByName } = useDeliveryQuery()
const { data: popularCities } = await getPopularCities()
const seletedCityId = ref<number | null>()

const cities = ref<City[]>([])
const searchValidationMessage = ref('')
const searchCity = async (term: string) => {
  const { data, status } = await mockSearchCityByName(term)

  if (status === 'error') {
    cities.value = []
    searchValidationMessage.value = 'Something went wrong. Try again'
    return
  }
  console.log('logs', data)
  cities.value = data
}

const route = useRoute()
watch(
  () => route,
  (newVal) => {
    const { id } = newVal.params
    if (id) {
      seletedCityId.value = parseInt(id as string)
      return
    }
    seletedCityId.value = null
  },
  { deep: true, immediate: true }
)

const router = useRouter()
const goToDeliveryCostPage = ({ id }: { id: number }) => {
  router.push({ name: 'deliveryCostPage', params: { id } })
}
</script>

<template>
  <div class="home-page">
    <div class="home-page__left-block">
      <TheHeader />
      <main class="home-page__main">
        <h1 class="home-page__title">Delivery cost</h1>
        <p class="home-page__subtitle">Enter name of the city to count delivery cost</p>

        <AutoComplete
          class="home-page__city-search"
          placeholder="Enter name of the city"
          :suggestions="cities"
          @search="searchCity"
          @complate="goToDeliveryCostPage"
          :validation-message="searchValidationMessage"
        />
        <PopularCities :cities="popularCities" />
      </main>
    </div>
    <div class="home-page__right-block">
      <div v-if="!seletedCityId" class="result-placeholder">
        <p class="result-placeholder__app-name">Fast Service</p>
        <img
          class="result-placeholder__image"
          src="@/assets/images/transport.png"
          alt="transport"
        />
        <img class="result-placeholder__image-road" src="@/assets/images/road.png" alt="road" />
      </div>
      <RouterView v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  width: 100%;
  display: flex;

  &__main {
    @media screen and (max-width: 1060px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 1060px) {
    flex-direction: column;
    padding-left: 0;
  }
  &__title {
    font-size: 48px;
    font-weight: bold;
    margin: 0 0 15px 0;
  }

  &__subtitle {
    color: var(--secondy-color);
    margin-bottom: 80px;
  }

  &__left-block {
    @media screen and (max-width: 1380px) {
      padding-left: 20px;
    }

    padding: 20px 0 0 0;
    width: 100%;
    max-width: 670px;
    @media screen and (max-width: 1060px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
      margin: 0 auto;
    }
  }

  &__right-block {
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    background-color: #f7f7f7;
    padding: 32px 0;
    @media screen and (max-width: 1060px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      padding-left: 0;
    }
  }

  &__city-search {
    margin-bottom: 80px;
  }
}

.delivery-cost {
  width: 100%;
  max-width: var(--left-block-width);
  @media screen and (max-width: 1060px) {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
  }
}

.result-placeholder {
  overflow: hidden;

  &__app-name {
    position: absolute;
    right: 10%;
    width: 100%;
    max-width: 320px;
    font-size: 96px;
    font-weight: bold;
    color: var(--secondy-color);
    opacity: 0.1;
    line-height: 90%;
    margin: 0;
  }

  &__image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -72%);
    max-width: 400px;
    z-index: 1;
    @media screen and (min-width: 1920px) {
      transform: translate(-50%, -50%);
    }
  }

  &__image-road {
    position: absolute;
    bottom: 0px;
    right: 0;
  }
}
</style>
