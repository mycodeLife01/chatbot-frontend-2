<template>
    <div class="flex flex-col gap-2 p-2 select-none h-full">
        <!-- 工具区 -->
        <div class="flex-none">
            <ChatItem justify="between" class="mb-2" custom-class="hover:bg-transparent">
                <button>
                    <img src="@/assets/ailura.png" alt="ailura" class="w-8 h-8 rounded-full cursor-pointer">
                </button>
                <button @click="handleSidebar" v-tooltip="{ content: '收起边栏', theme: 'sidebar-tooltip' }">
                    <PanelLeft :stroke-width="1" class="w-5 h-5 cursor-pointer hidden lg:block" />
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
        </div>
        <!-- 聊天记录区 -->
        <div class="space-y-2 flex-auto">
            <ChatItem v-for="chat in chatHistory" :key="chat.chat_id"
                :class="{ 'bg-gray-200': selectedChatId === chat.chat_id }" @click="selectChat(chat.chat_id)"
                justify="between" custom-class="group">
                {{ chat.chat_name }}
                <div class="dropdown dropdown-end">
                    <button class="flex items-center justify-center">
                        <Ellipsis
                            class="w-4 h-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                    <ul tabindex="0"
                        class="dropdown-content menu bg-base-100 rounded-2xl w-32 p-2 shadow-sm border border-gray-300">
                        <li @click="doLogout"><a>删除对话</a></li>
                        <li><a>修改</a></li>
                    </ul>
                </div>
            </ChatItem>
        </div>
        <div class="p-2 flex-none border-t border-gray-200">
            <ChatItem>
                <Settings :stroke-width="2" class="w-5 h-5" />
                设置
            </ChatItem>
            <!-- 用户信息区，仅在移动端显示 -->
            <ChatItem class="lg:hidden dropdown dropdown-top dropdown-end cursor-pointer" v-if="isLoggedIn">
                <button class="flex items-center gap-2 cursor-pointer">
                    <img src="@/assets/ailura.png" alt="ailura" class="w-6 h-6 rounded-full ">
                    {{ user.username }}
                </button>
                <ul tabindex="0"
                    class="dropdown-content menu bg-base-100 rounded-2xl z-1 w-30 p-2 shadow-sm border border-gray-300">
                    <li @click="doLogout"><a>退出登录</a></li>
                </ul>
            </ChatItem>
        </div>
    </div>
</template>

<script setup>
import ChatItem from './ChatItem.vue'
import { ref, onMounted, watch } from 'vue'
import { PenLine, Search, PanelLeft, Ellipsis } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { useChatStore } from '@/stores/chat'
import useChat from '@/composables/useChat'
import { storeToRefs } from 'pinia'
import { Settings } from 'lucide-vue-next'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/user'
const { user, isLoggedIn } = storeToRefs(useAuthStore())
// 模拟数据
const chatHistory = ref([])
// 侧边栏伸缩
const { toggleSidebar } = useThemeStore()
const handleSidebar = () => {
    toggleSidebar()
}
const { loadHistoryChats } = useChat()
const getChats = async () => {
    console.log('getChats');
    const res = await loadHistoryChats()
    if (res) {
        chatHistory.value = res.sort((a, b) => b.update_time - a.update_time)
        console.log('getChats success');
    }
}
onMounted(async () => {
    await getChats()
})
watch(isLoggedIn, async () => {
    await getChats()
})
const { setSelectedChatId } = useChatStore()
const { selectedChatId } = storeToRefs(useChatStore())
const selectChat = (chat_id) => {
    setSelectedChatId(chat_id)
}
const { logout } = useAuth()
const doLogout = () => {
    logout()
}
</script>

<style></style>