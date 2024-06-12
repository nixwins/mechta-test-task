<script setup lang="ts">
import { useDeliveryQuery } from '@/composables'
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { errorMessage } from '@/consts'
import { City } from '@/types'
import { useRoute } from 'vue-router'

const DeliveryCard = defineAsyncComponent(() => import('@/components/DeliveryCostCard.vue'))

const { getDeliveryCostByCityId } = useDeliveryQuery()

const route = useRoute()
const cityId = ref(parseInt(route.params.id as string))

const city = ref<City | null>(null)
const deliveryType = computed(() => city.value?.type || 'pickup')

if (cityId.value) {
  getCity()
}

const price = computed(() => {
  if (!city.value) return { pickup: 0, courier: 0, post: 0 }

  return {
    pickup: deliveryType.value === 'pickup' ? city.value.price : 0,
    courier: deliveryType.value === 'courier' ? city.value.price : 0,
    post: deliveryType.value === 'post' ? city.value.price : 0
  }
})

async function getCity() {
  try {
    const { data } = await getDeliveryCostByCityId(cityId.value)
    city.value = data
  } catch (e) {
    console.error(errorMessage.REQUEST_FAILD, e)
  }
}

watch(
  () => route,
  (newVal) => {
    cityId.value = parseInt(newVal.params.id as string)
    getCity()
  },
  { deep: true }
)
</script>
<template>
  <div class="delivery-cost">
    <DeliveryCard class="card-pickup" title="Pick up" :cost="`${price.pickup}$`">
      <template #right-block>
        <div class="card-pickup__wrapper">
          <img src="@/assets/images/pickup-box.svg" />
          <div class="card-pickup__checked">
            <svg
              width="29"
              height="21"
              viewBox="0 0 29 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="26.5408"
                width="3"
                height="26.2206"
                transform="rotate(45 26.5408 0)"
                fill="white"
              />
              <rect
                x="12.1099"
                y="18.6367"
                width="3"
                height="13.1722"
                transform="rotate(135 12.1099 18.6367)"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </template>
    </DeliveryCard>
    <DeliveryCard class="card-curier" title="Courier" :cost="`${price.courier}$`">
      <template #right-block>
        <div>
          <img src="@/assets/images/delivery-transport.svg" />
        </div>
      </template>
    </DeliveryCard>
    <DeliveryCard class="card-delivery-cost" title="Post" :cost="`${price.post}$`">
      <template #right-block>
        <div>
          <img src="@/assets/images/post.svg" />
        </div>
      </template>
    </DeliveryCard>
  </div>
</template>

<style scoped lang="scss">
.delivery-cost {
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
}

.card-pickup {
  // padding-right: 0 !important;
  position: relative;

  &__wrapper {
    display: flex;
  }

  &__checked {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: linear-gradient(45deg, #65b3e4, #ffffff);
  }
}
</style>
