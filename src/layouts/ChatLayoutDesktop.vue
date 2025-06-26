<!-- ChatLayout.vue -->
<template>
  <div class="h-full flex overflow-hidden">
    <!-- 侧边栏壳：只负责 width 动画 -->
    <!-- todo: v-if不可触发登陆后侧边栏展开 -->
    <aside v-show="isLoggedIn" :class="[
      'relative overflow-hidden transition-[width] duration-300 ease-in-out h-full',
      isSidebarOpen ? 'w-sidebar' : 'w-0'
    ]">
      <!-- 真正的侧边栏内容：固定宽度 + 绝对定位 -->
      <div class="h-full absolute inset-0 w-sidebar bg-gray-50 border-r border-gray-200">
        <SideBar />
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col bg-white">
      <header class="h-header flex justify-between items-center px-3 border-b border-gray-200">
        <Header />
      </header>
      <main class="flex-1 overflow-y-auto ">
        <router-view class="bg-red-200"/>
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/user'
import { watch, ref } from 'vue'
import useChat from '@/composables/useChat'
const { isLoggedIn } = storeToRefs(useAuthStore())
const { isSidebarOpen } = storeToRefs(useThemeStore())
</script>