<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AppLogo = defineAsyncComponent(() => import('@/components/icons/AppLogo.vue'))
</script>

<template>
  <RouterLink to="/" class="app-logo">
    <AppLogo class="app-logo__image" />
    <span class="app-logo__text" to="/">FastService</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  &__image {
    width: 41px;
    height: 41px;
  }

  &__text {
    font-weight: 700;
    font-size: 24px;
    line-height: 28.13px;
    color: var(--text-color);
  }
}
</style>
