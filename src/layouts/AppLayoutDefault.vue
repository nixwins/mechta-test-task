<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AnimatedLoader = defineAsyncComponent(() => import('@/components/AnimatedLoader.vue'))
</script>

<template>
  <div class="container default-layout">
    <Suspense>
      <slot></slot>

      <template #fallback> <AnimatedLoader /> </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  max-width: 1440px;
  margin: 0 0 0 auto;
}
</style>
