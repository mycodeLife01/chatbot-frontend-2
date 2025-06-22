<template>
  <div :class="drawerClasses">
    <input id="chat-drawer" type="checkbox" class="drawer-toggle" v-model="isSidebarOpen" />
    <main class="drawer-content flex flex-col overflow-y-auto">
      <header class="h-header flex justify-between items-center px-3 border-b border-gray-200">
        <Header />
      </header>
      <router-view class="flex-1" />
    </main>
    <div class="drawer-side">
      <label for="chat-drawer" class="drawer-overlay"></label>
      <aside class="w-sidebar bg-gray-50 min-h-full">
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

const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)

// 动态控制drawer类
const drawerClasses = computed(() => [
  'drawer',
  'h-screen',
  'drawer-auto-gutter'
])
</script>