<template>
    <div class="h-full flex flex-col">
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
        </div>

        <!-- 输入区域 -->
        <div class="w-full flex-shrink-0 border-gray-200">
            <div class="w-full mx-auto p-2">
                <ChatInput class="mx-auto" />
                <BottomTip class="hidden lg:block text-center mt-2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
import { watch, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import UserRequest from "@/components/UserRequest.vue";
import ModelReply from "@/components/ModelReply.vue";
import useMessage from "@/composables/useMessage";
import { useChatStore } from "@/stores/chat";
import { useAuthStore } from "@/stores/user";

const chatStore = useChatStore()
const { getMessages } = useMessage()
const messages = ref([])
const { selectedChatId } = storeToRefs(chatStore)
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
})

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
watch(isLoggedIn, () => {
    if (!isLoggedIn.value) {
        console.log('清空了');
        messages.value = []
    }
})
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