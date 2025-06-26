<template>
    <div class="h-full flex flex-col">
        <!-- 聊天内容区域 -->
        <div class="flex-1 overflow-y-auto chat-scroll-area">
            <div class="max-w-[94%] mx-auto p-4">
                <div class="flex justify-end mb-4">
                    <UserRequest>123</UserRequest>
                </div>
                <div class="space-y-4">
                    <ModelReply>
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                    </ModelReply>
                    <ModelReply>
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                    </ModelReply>
                    <ModelReply>
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                        是的，因为用了 absolute，ChatInput 和 BottomTip 已经
                    </ModelReply>
                    <!-- 测试更多消息 -->
                    <ModelReply v-for="i in 18" :key="i">
                        测试消息 {{ i }}：现在页面结构更简洁，减少了不必要的div嵌套。
                    </ModelReply>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="w-full flex-shrink-0 border-gray-200">
            <div class="w-full mx-auto p-2">
                <ChatInput class="w-[98%] mx-auto" />
                <BottomTip class="hidden lg:block text-center mt-2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import UserRequest from "@/components/UserRequest.vue";
import ModelReply from "@/components/ModelReply.vue";

const themeStore = useThemeStore()
const { isSidebarOpen } = storeToRefs(themeStore)
</script>

<style scoped>
/* 聊天滚动区域样式 */
.chat-scroll-area {
    scroll-behavior: smooth;
}

/* 自定义滚动条样式 */
.chat-scroll-area::-webkit-scrollbar {
    width: 8px;
}

.chat-scroll-area::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.chat-scroll-area::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.chat-scroll-area::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

/* Firefox滚动条 */
.chat-scroll-area {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
}

/* 确保flex子元素正确 */
.flex-1 {
    min-height: 0;
}
</style>