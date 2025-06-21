import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isSidebarOpen = ref(true);
    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value
    }
    return {
        isSidebarOpen,
        toggleSidebar
    }
})