<template>
    <div>
        <ChatInput class="absolute bottom-8 left-1/2 -translate-x-1/2" />
        <BottomTip class="absolute bottom-2 left-1/2 -translate-x-1/2" />
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
</script>