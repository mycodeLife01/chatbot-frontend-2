<template>
    <div class="flex flex-col gap-2 p-2">
        <ChatItem justify="between" class="mb-2" custom-class="hover:bg-transparent">
            <button>
                <img src="@/assets/ailura.png" alt="ailura" class="w-8 h-8 rounded-full cursor-pointer">
            </button>
            <button @click="handleSidebar">
                <PanelLeft :stroke-width="2" class="w-5 h-5 cursor-pointer hidden lg:block" />
            </button>
        </ChatItem>
        <ChatItem>
            <PenLine :stroke-width="2" class="w-5 h-5" />
            新聊天
        </ChatItem>
        <ChatItem>
            <Search :stroke-width="2" class="w-5 h-5" />
            搜索聊天
        </ChatItem>
        <ChatItem v-for="chat in chatHistory" :key="chat.id" :class="{ 'bg-gray-200': activeChatId === chat.id }">
            {{ chat.title }}
        </ChatItem>
    </div>
</template>

<script setup>
import ChatItem from './ChatItem.vue'
import { ref } from 'vue'
import { PenLine, Search, PanelLeft } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
// 模拟数据
const activeChatId = ref(1)
const chatHistory = ref([
    { id: 1, title: '专注模式提醒设置' },
    { id: 2, title: 'Rain on 解释' },
    { id: 3, title: 'Python str split 方法' },
    { id: 4, title: '熬夜工作健康应对' },
    { id: 5, title: 'Linux 文件重命名命令' },
    { id: 6, title: '随间活动规划建议' },
    { id: 7, title: '一尺长度解释' },
    { id: 8, title: 'FastAPI 服务层设计' },
    { id: 9, title: 'First name与姓的区别' },
    { id: 10, title: '古罗马城市人口' },
    { id: 11, title: '游戏结算英文表达' },
    { id: 12, title: '韩立人物介绍' }
])
// 侧边栏伸缩
const { isSidebarOpen, toggleSidebar } = useThemeStore()
const handleSidebar = () => {
    toggleSidebar()
}
</script>

<style scoped></style>