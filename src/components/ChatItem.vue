<template>
  <div 
    class="w-[95%] h-8 hover:bg-gray-200 rounded-xl p-2 flex items-center text-[14px] "
    :class="[justifyClass, customClass]"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  justify: {
    type: String,
    default: 'start', // 可选值: 'start', 'between', 'center', 'around', 'evenly'
    validator: (value) => ['start', 'between', 'center', 'around', 'evenly'].includes(value)
  },
  customClass: {
    type: String,
    default: ''
  }
})

const justifyClass = computed(() => {
  const justifyMap = {
    'start': 'justify-start gap-2 cursor-pointer',
    'between': 'justify-between',
    'center': 'justify-center gap-2',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  }
  return justifyMap[props.justify] || 'justify-start gap-2'
})
</script>
