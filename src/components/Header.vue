<template>
    <label for="chat-drawer" aria-label="open sidebar" class="lg:hidden cursor-pointer">
        <Menu :stroke-width="1.5" class="w-6 h-6" />
    </label>
    <div class="lg:hidden">
        <span>Ailura </span>
        <span class="text-gray-500 text-sm">V1</span>
    </div>
    <button class="lg:hidden w-8 h-8 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        <PenLine :stroke-width="1.5" class="w-5 h-5" />
    </button>
    <div v-if="!isMobile" class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
            <PanelLeft :stroke-width="1" class="w-5 h-5 cursor-pointer" @click="handleSidebar" v-if="!isSidebarOpen" />
            <button class="text-md select-none">
                Ailura
            </button>
        </div>
        <button class="select-none cursor-pointer">
            <img src="@/assets/ailura.png" alt="avatar" class="w-8 h-8 rounded-full">
        </button>
    </div>


</template>

<script setup>
import { PenLine, Menu, PanelLeft } from "lucide-vue-next"
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
const handleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const { isMobile } = storeToRefs(themeStore)
</script>
