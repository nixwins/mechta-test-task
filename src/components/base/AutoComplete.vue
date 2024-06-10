<script setup lang="ts">
import { computed, ref } from 'vue'
import { debounce } from '@/utils'

type Item = { id: number; name: string; [key: string]: any }

interface Props {
  suggestions: Item[]
  delay?: number
  validationMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  suggestions: () => [],
  delay: 300
})

interface Emits {
  (e: 'complate', data: any): void
  (e: 'search', data: string): void
}
const emit = defineEmits<Emits>()
const showSuggestinsList = ref(false)

const term = ref()
const search = debounce(() => {
  showSuggestinsList.value = true
  emit('search', term.value)
}, props.delay)

const isSearchResultEmpty = computed(() => !!(term.value && !props.suggestions?.length))
const hasError = computed(() => !!(isSearchResultEmpty.value || props.validationMessage))

const errorMessage = computed(() =>
  isSearchResultEmpty.value
    ? 'We didn’t found such city. Please check spelling'
    : props.validationMessage
)

const suggestionsListOpened = computed(
  () => term.value && !isSearchResultEmpty.value && showSuggestinsList.value
)

const selectedItem = ref<Item>()
const selectItem = (item: Item) => {
  selectedItem.value = item
  term.value = item.name
  showSuggestinsList.value = false
}

const complate = () => {
  emit('complate', selectedItem.value)
}
</script>

<template>
  <div
    class="auto-complate"
    :class="{ 'dropdown-opened': suggestionsListOpened, invalid: hasError }"
  >
    <div class="input-group">
      <input v-model="term" type="text" @input="search" />
      <button v-if="!isSearchResultEmpty" class="auto-complate__btn-enter" @click="complate">
        Enter
      </button>
      <button v-else class="auto-complate__btn-clear">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="14.723"
            y="0.646484"
            width="2.92753"
            height="19.9072"
            transform="rotate(45 14.723 0.646484)"
            fill="white"
          />
          <rect
            x="17.0001"
            y="14.9299"
            width="2.92753"
            height="19.9072"
            transform="rotate(135 17.0001 14.9299)"
            fill="white"
          />
        </svg>
      </button>

      <p v-if="hasError && errorMessage" class="validation-message">{{ errorMessage }}</p>
    </div>
    <div v-if="suggestionsListOpened" class="dropdown">
      <div
        v-for="item in suggestions"
        :key="item.id"
        class="dropdown__item"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auto-complate {
  max-width: 525px;
  border-radius: 32px;
  position: relative;

  &__btn-enter,
  &__btn-clear {
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
  }
  &__btn-enter {
    background: linear-gradient(45deg, #65b3e4, #78a1bb);
    border-radius: 32px;
    padding: 16px 48px;
    font-size: 24px;
    font-weight: bold;
    &:hover {
      color: var(--main-text-color);
    }
  }
  &__btn-clear {
    border-radius: 50%;
    width: 65px;
    height: 65px;
    background: linear-gradient(139deg, #ff4757, #ffffff);
  }
}
.input-group {
  position: relative;
  z-index: 1001;
  width: 100%;
  input {
    width: 100%;
    padding: 16px 0 16px 32px;
    border-radius: 32px;
    border: 1px solid #e9f0eb;
    min-height: 63px;

    &::placeholder {
      font-family: 'Roboto';
      color: #d9e4dc;
      font-size: 24px;
    }

    &:focus {
      outline: none;
    }
  }
}
.dropdown {
  padding: 0 18px;
  max-height: 255px;
  overflow-y: auto;
  position: absolute;
  background-color: #fff;
  width: 100%;
  z-index: 999;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;

  scrollbar-width: 1px;
  &__item {
    cursor: pointer;
    padding: 26px 18px 9px 18px;
    border-bottom: 1px solid #e9f0eb;
    &:last-child {
      border-bottom: none;
    }
  }
}
.dropdown-opened {
  box-shadow: 4px 2px 20px 0px rgba(0, 0, 0, 0.2);
  .dropdown {
    box-shadow: 4px 2px 20px 0px rgba(0, 0, 0, 0.2);
  }
  input {
    border: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.validation-message {
  color: var(--text-danger-color);
  font-size: 20px;
}

.invalid {
  input {
    border-color: var(--text-danger-color);
  }
}
</style>
