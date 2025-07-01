<template>
    <div class="h-full flex flex-col overflow-hidden" :key="reloadKey">
        <!-- 聊天内容区域 -->
        <div ref="chatArea"
            class="flex-1 overflow-y-auto chat-scroll-area scrollbar scrollbar-thumb-gray-300 scrollbar-track-white">
            <div v-if="messages && messages.length > 0">
                <div v-for="message in messages" :key="message.message_id"
                    class="max-w-[94%] lg:max-w-[780px] mx-auto p-4">
                    <div v-if="message.is_ai === 0" class="flex justify-end mb-4">
                        <UserRequest>{{ message.message_content }}</UserRequest>
                    </div>
                    <div v-else-if="message.is_ai === 1">
                        <ModelReply :content="message.message_content" />
                    </div>
                </div>
            </div>
            <div v-else
                class="flex flex-col items-center justify-center h-full w-full text-center select-none text-[24px]">
                {{ welcomeMessage }}
            </div>

            <!-- AI回复中的提示 -->
            <div v-if="isAiResponding && messages.length > 0 && messages[messages.length - 1].message_content === ''"
                class="max-w-[94%] lg:max-w-[780px] mx-auto p-4">
                <div class="flex items-center space-x-2 text-gray-500">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Ailura在想...</span>
                </div>
            </div>

            <!-- 动态底部占位空间 -->
            <div v-if="extraScrollHeight > 0" :style="{ height: extraScrollHeight + 'px' }"
                class="transition-all duration-300"></div>
        </div>

        <!-- 输入区域 -->
        <div class="w-full flex-shrink-0 border-gray-200">
            <div class="w-full mx-auto p-2">
                <ChatInput class="mx-auto" @send-success="handleSendSuccess" @new-chat-start="handleNewChatStart" />
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
import { useMessageStore } from "@/stores/message";

const chatStore = useChatStore()
const { getMessages } = useMessage()
const messages = ref([])
const { selectedChatId } = storeToRefs(chatStore)
const isAiResponding = ref(false)
const chatArea = ref(null)
const extraScrollHeight = ref(0)

const fetchMessages = async () => {
    if (selectedChatId.value) {
        console.log('1');
        const res = await getMessages(selectedChatId.value)
        messages.value = res
        // 切换聊天时重置额外高度
        extraScrollHeight.value = 0
    } else {
        console.log('2');
        messages.value = []
        extraScrollHeight.value = 0
    }
    scrollToBottom()
}

watch(selectedChatId, async () => {
    console.log('chatid改变了');
    console.log('调用了fetch messages');

    // 添加短暂延迟，让handleSendSuccess先执行，避免覆盖正在进行的对话
    setTimeout(async () => {
        if (!isAiResponding.value) {
            await fetchMessages()
        }
    }, 50)
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
        extraScrollHeight.value = 0
    }
})

const reloadKey = ref(0)

const scrollToBottom = () => {
    nextTick(() => {
        const chatAreaEl = chatArea.value || document.querySelector('.chat-scroll-area')
        if (chatAreaEl) {
            chatAreaEl.scrollTop = chatAreaEl.scrollHeight
        }
    })
}

const getChatAreaHeight = () => {
    if (chatArea.value) {
        return chatArea.value.clientHeight
    }
    return 0
}

const addExtraScrollSpace = () => {
    const chatAreaHeight = getChatAreaHeight()
    if (chatAreaHeight > 0) {
        // 只添加chat area高度的0.8倍，给AI回复提供足够空间
        extraScrollHeight.value = Math.floor(chatAreaHeight * 0.8)
        // 添加额外空间后，滚动到底部
        // nextTick(() => {
        //     scrollToBottom()
        // })
        scrollToBottom()
    }
}

const reduceExtraScrollSpace = () => {
    const chatAreaHeight = getChatAreaHeight()
    if (chatAreaHeight > 0) {
        // AI回复结束后，将底部空白区域减少到chat area高度的1/8
        extraScrollHeight.value = Math.floor(chatAreaHeight * 0.125)
    }
}

const handleSendSuccess = async (messageData) => {
    // 添加用户消息
    messages.value.push(messageData)

    // 在用户发送消息后增加额外的滚动空间
    addExtraScrollSpace()

    // scrollToBottom()

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
                // scrollToBottom() 注释是为了避免回复时用户无法滑动滚动条
            },
            (error) => {
                console.error('AI回复失败:', error)
                aiMessage.value.message_content = '抱歉，AI回复时出现了错误。'
                isAiResponding.value = false
                // AI回复失败时也减少底部空白
                reduceExtraScrollSpace()
            },
            () => {
                // 回复完成
                isAiResponding.value = false
                // AI回复结束后，减少底部空白区域
                reduceExtraScrollSpace()
                // reloadKey.value++
            }
        )
    }
}

const handleNewChatStart = () => {
    // 处理新聊天开始，清空消息列表
    console.log('新聊天开始');
    messages.value = []
    extraScrollHeight.value = 0
    scrollToBottom()
}

//监测是否需要重置messages，在删除一个对话后
const messageStore = useMessageStore()
const { isMessageReloading } = storeToRefs(messageStore)
watch(isMessageReloading, () => {
    if (isMessageReloading.value) {
        messages.value = []
        extraScrollHeight.value = 0
    }
})
</script>