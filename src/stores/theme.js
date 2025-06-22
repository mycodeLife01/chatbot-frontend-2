import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const isSidebarOpen = ref(true);
    const isMobile = ref(false);
    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value
    }
    const setIsMobile = (value) => {
        isMobile.value = value
    }
    return {
        isSidebarOpen,
        isMobile,
        toggleSidebar,
        setIsMobile
    }
})