<template>
    <div class="h-full flex flex-col" :key="reloadKey">
        <!-- 聊天内容区域 -->
        <div class="flex-1 overflow-y-auto chat-scroll-area">
            <div v-for="message in messages" :key="message.message_id" class="max-w-[94%] lg:max-w-[780px] mx-auto p-4">
                <div v-if="message.is_ai === 0" class="flex justify-end mb-4">
                    <UserRequest>{{ message.message_content }}</UserRequest>
                </div>
                <div v-else>
                    <ModelReply :content="message.message_content" />
                </div>
            </div>

            <!-- AI回复中的提示 -->
            <div v-if="isAiResponding && messages.length > 0 && messages[messages.length - 1].message_content === ''"
                class="max-w-[94%] lg:max-w-[780px] mx-auto p-4">
                <div class="flex items-center space-x-2 text-gray-500">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>AI正在思考中...</span>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="w-full flex-shrink-0 border-gray-200">
            <div class="w-full mx-auto p-2">
                <ChatInput class="mx-auto" @send-success="handleSendSuccess" />
                <BottomTip class="hidden lg:block text-center mt-2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
import { watch, ref, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import UserRequest from "@/components/UserRequest.vue";
import ModelReply from "@/components/ModelReply.vue";
import useMessage from "@/composables/useMessage";
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/user";
import { getAiStreamResponse } from "@/api/modules/message";

const chatStore = useChatStore()
const { getMessages } = useMessage()
const messages = ref([])
const { selectedChatId } = storeToRefs(chatStore)
const isAiResponding = ref(false)

const fetchMessages = async () => {
    if (selectedChatId.value) {
        const res = await getMessages(selectedChatId.value)
        messages.value = res
    }
}

watch(selectedChatId, async () => {
    await fetchMessages()
})

onMounted(async () => {
    await fetchMessages()
    scrollToBottom()
})

const authStore = useAuthStore()
const { isLoggedIn, welcomeMessage } = storeToRefs(authStore)
watch(isLoggedIn, () => {
    if (!isLoggedIn.value) {
        console.log('清空了');
        messages.value = []
    }
})

const reloadKey = ref(0)

const scrollToBottom = () => {
    nextTick(() => {
        const chatArea = document.querySelector('.chat-scroll-area')
        if (chatArea) {
            chatArea.scrollTop = chatArea.scrollHeight
        }
    })
}

const handleSendSuccess = async (messageData) => {
    // 添加用户消息
    messages.value.push(messageData)
    scrollToBottom()

    // 开始AI回复
    if (selectedChatId.value) {
        isAiResponding.value = true

        // 创建AI消息对象
        const aiMessage = ref({
            message_id: `temp_${Date.now()}`,
            message_content: '',
            is_ai: 1,
            create_time: new Date().toISOString()
        })
        messages.value.push(aiMessage.value)
        scrollToBottom()

        // 获取AI流式回复
        getAiStreamResponse(
            { chat_id: selectedChatId.value },
            (data) => {
                // 处理流式数据
                if (data.type === 'chunk' && data.content) {
                    aiMessage.value.message_content += data.content
                } else if (data.content) {
                    aiMessage.value.message_content += data.content
                } else if (typeof data === 'string') {
                    aiMessage.value.message_content += data
                }
                scrollToBottom()
            },
            (error) => {
                console.error('AI回复失败:', error)
                aiMessage.value.message_content = '抱歉，AI回复时出现了错误。'
                isAiResponding.value = false
            },
            () => {
                // 回复完成
                isAiResponding.value = false
                // reloadKey.value++
            }
        )
    }
}
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