<template>
    <label for="chat-drawer" aria-label="open sidebar" class="lg:hidden cursor-pointer">
        <Menu :stroke-width="1.5" class="w-6 h-6" />
    </label>
    <div class="lg:hidden">
        <span class="font-mono">Ailura </span>
        <span class="text-gray-500 text-sm">V1</span>
    </div>
    <button class="lg:hidden w-8 h-8 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        <PenLine :stroke-width="1.5" class="w-5 h-5" />
    </button>
    <div v-if="!isMobile" class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
            <PanelLeft :stroke-width="1" class="w-5 h-5 cursor-pointer" @click="handleSidebar"
                v-if="!isSidebarOpen && isLoggedIn" v-tooltip="{ content: '打开边栏', theme: 'sidebar-tooltip' }" />
            <button class="text-md select-none">
                Ailura
            </button>
        </div>
        <button class="select-none cursor-pointer" v-if="isLoggedIn">
            <img src="@/assets/ailura.png" alt="avatar" class="w-8 h-8 rounded-full">
        </button>
        <div v-else class="select-none flex items-center gap-2">
            <button class="cursor-pointer text-sm border border-gray-300 rounded-2xl px-2 py-1 bg-black text-white"
                @click="showLoginModal = true">
                登录
            </button>
            <button class="cursor-pointer text-sm border border-gray-300 rounded-2xl px-2 py-1 hover:bg-gray-100 "
                @click="showRegisterModal = true">
                免费注册
            </button>
            <RegisterModal v-if="showRegisterModal" @closeRegisterModal="showRegisterModal = false" />
            <LoginModal v-if="showLoginModal" @closeLoginModal="showLoginModal = false" />
        </div>
    </div>


</template>

<script setup>
import { PenLine, Menu, PanelLeft } from "lucide-vue-next"
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { ref } from 'vue'
import RegisterModal from './RegisterModal.vue'
import LoginModal from './LoginModal.vue'
// 控制主题
const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
const handleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
const { isMobile } = storeToRefs(themeStore)
// 控制用户登录状态
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
onMounted(() => {
    if (isLoggedIn.value === false) {
        isSidebarOpen.value = false
    }
})
const showRegisterModal = ref(false)
const showLoginModal = ref(false)
</script>
