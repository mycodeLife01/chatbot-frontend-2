<template>
    <!-- 移动端 -->
    <label for="chat-drawer" aria-label="open sidebar" class="lg:hidden cursor-pointer" v-if="isLoggedIn">
        <Menu :stroke-width="1.5" class="w-6 h-6" />
    </label>
    <div class="lg:hidden">
        <span class="font-mono">Ailura </span>
        <span class="text-gray-500 text-sm">V1</span>
    </div>
    <button v-if="isLoggedIn"
        class="lg:hidden w-8 h-8 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        <PenLine :stroke-width="1.5" class="w-5 h-5" />
    </button>
    <div v-else class="lg:hidden flex items-center gap-2">
        <LoginButton @click="showLoginModal = true" />
        <RegisterButton @click="showRegisterModal = true" />
        <RegisterModal v-if="showRegisterModal" @closeRegisterModal="showRegisterModal = false"
            @goToLogin="doGoToLogin" />
        <LoginModal v-if="showLoginModal" @closeLoginModal="showLoginModal = false" />
    </div>

    <!-- 桌面端 -->
    <div v-if="!isMobile" class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
            <PanelLeft :stroke-width="1" class="w-5 h-5 cursor-pointer" @click="handleSidebar"
                v-if="!isSidebarOpen && isLoggedIn" v-tooltip="{ content: '打开边栏', theme: 'sidebar-tooltip' }" />
            <button class="text-md select-none">
                Ailura
            </button>
        </div>
        <div class="dropdown dropdown-end" v-if="isLoggedIn">
            <button class="select-none cursor-pointer">
                <img src="@/assets/ailura.png" alt="avatar" class="w-8 h-8 rounded-full">
            </button>
            <ul tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-2xl z-1 w-52 p-2 shadow-sm border border-gray-300">
                <div class="p-3 text-[14px] text-gray-500 flex items-center gap-2">
                    <UserRound :stroke-width="1" class="w-5 h-5" />
                    {{ user.username }}
                </div>
                <li @click="doLogout"><a>退出登录</a></li>
                <li><a>设置</a></li>
            </ul>
        </div>

        <div v-else class="select-none flex items-center gap-2">
            <LoginButton @click="showLoginModal = true" />
            <RegisterButton @click="showRegisterModal = true" />
            <RegisterModal v-if="showRegisterModal" @closeRegisterModal="showRegisterModal = false"
                @goToLogin="doGoToLogin" />
            <LoginModal v-if="showLoginModal" @closeLoginModal="showLoginModal = false" />
        </div>
    </div>


</template>

<script setup>
import { PenLine, Menu, PanelLeft, UserRound } from "lucide-vue-next"
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { ref } from 'vue'
import RegisterModal from './RegisterModal.vue'
import LoginModal from './LoginModal.vue'
import useAuth from '@/composables/useAuth'
import LoginButton from './LoginButton.vue'
import RegisterButton from './RegisterButton.vue'
// 控制主题
const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
const handleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}
const { isMobile } = storeToRefs(themeStore)
// 控制用户登录状态
const authStore = useAuthStore()
const { isLoggedIn, user } = storeToRefs(authStore)
const showRegisterModal = ref(false)
const showLoginModal = ref(false)

const { logout } = useAuth()
const doLogout = () => {
    logout()
    showLoginModal.value = false
}
const doGoToLogin = () => {
    showRegisterModal.value = false
    showLoginModal.value = true
}
</script>
