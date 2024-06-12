<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  title: string
  subtitle?: string
  cost?: string
}

defineProps<Props>()
</script>
<template>
  <div class="card">
    <div class="card__left">
      <h6 class="card__title">{{ title }}</h6>
      <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
      <p class="card__cost">{{ cost }}</p>
    </div>
    <div class="card__right">
      <slot name="right-block"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 523px;
  min-height: 200px;
  background-color: #fff;
  border-radius: 20px;
  padding: 29px 45px 17px 45px;

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  &__title {
    font-size: 36px;
    margin: 0;
  }

  &__cost {
    color: var(--main-color);
    font-size: 50px;
    font-weight: bold;
    margin: 0;
  }
}
</style>
