<template>
  <div>
    <!-- 移动端布局 (lg以下) -->
    <ChatLayoutMobile v-if="isMobile" />
    <!-- 桌面端布局 (lg及以上) -->
    <ChatLayoutDesktop v-else />
  </div>
</template>

<script setup>
import ChatLayoutMobile from './ChatLayoutMobile.vue'
import ChatLayoutDesktop from './ChatLayoutDesktop.vue'
import { onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()
// 仅将 state 属性转换为 ref
const { isMobile } = storeToRefs(themeStore)
// 从 store 直接获取 action 函数
const { setIsMobile } = themeStore
// 检查屏幕尺寸
const checkScreenSize = () => {
  // lg 断点通常是 1024px，根据你的 Tailwind 配置调整
  setIsMobile(window.innerWidth < 1024)
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
