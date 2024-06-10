<script setup lang="ts">
import type { City } from '@/types'

interface Props {
  cities: City[]
}

withDefaults(defineProps<Props>(), {
  cities: () => []
})
</script>

<template>
  <div class="popular-cities">
    <h2 class="popular-cities__title">Most popular cities</h2>
    <div class="popular-cities__list">
      <div v-for="{ id, name } in cities" :key="id" class="popular-cities__list-item">
        <RouterLink :to="`/delivery/city/${id}`">{{ name }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popular-cities {
  &__title {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 42px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    width: 100%;
    padding-left: 15px;

    &-item {
      a {
        display: block;
        text-decoration: none;
        padding-bottom: 4px;

        color: var(--secondy-color);
        border-bottom: 1px solid #e9f0eb;
        max-width: 225px;
        width: 100%;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>
