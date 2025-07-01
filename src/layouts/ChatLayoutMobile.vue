<template>
  <div :class="drawerClasses">
    <input id="chat-drawer" type="checkbox" class="drawer-toggle" v-model="isMobileSidebarOpen" />
    <main class="drawer-content flex flex-col overflow-y-auto">
      <header class="h-header min-h-[50px] flex justify-between items-center px-3 border-b border-gray-200">
        <Header />
      </header>
      <router-view class="flex-1" />
    </main>
    <div class="drawer-side h-full">
      <label for="chat-drawer" class="drawer-overlay"></label>
      <aside class="w-sidebar bg-gray-50 h-full">
        <SideBar />
      </aside>
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/user'
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
const isMobileSidebarOpen = computed(() => {
  return isSidebarOpen.value && isLoggedIn.value
})
// 动态控制drawer类
const drawerClasses = computed(() => [
  'drawer',
  'h-full',
  'drawer-auto-gutter',
])
</script>