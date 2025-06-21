<template>
    <div class="lg:z-10">
        <ChatInput
            class="fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-[calc(-50%+calc(var(--width-sidebar)/2))]" />
        <BottomTip
            class="fixed bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-[calc(-50%+calc(var(--width-sidebar)/2))]" />
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
import { useThemeStore } from '@/stores/theme'
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)

// 调试用：监听状态变化
watch(isSidebarOpen, (newVal) => {
  console.log('isSidebarOpen changed in ChatView:', newVal)
}, { immediate: true })
</script>