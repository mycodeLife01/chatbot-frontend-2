<template>
    <div class="rounded-4xl w-[94%] h-auto min-h-[60px] border border-gray-300 shadow-sm 
        lg:w-[780px] p-2 bg-white select-none">
        <textarea @keyup.enter.prevent="doSendMessage" v-model="message" ref="ta" placeholder="询问任何问题" rows="1" @input="autoResize" class="p-2 w-full resize-none
            leading-6 text-md font-medium focus:outline-none bg-transparent"></textarea>
        <div class="mt-2 flex justify-between">
            <div class="flex gap-1 items-center">
                <button class="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-gray-100 rounded-3xl">
                    <Plus :stroke-width="1.8" class="w-5 h-5" />
                </button>
                <div class="flex items-center justify-evenly w-16 h-8 cursor-pointer hover:bg-gray-100 rounded-3xl">
                    <button>
                        <Puzzle :stroke-width="1.8" class="w-4 h-4 " />
                    </button>
                    <span class="text-sm">工具</span>
                </div>
            </div>
            <button v-if="isSentable" @click="doSendMessage"
                class="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-black hover:text-white rounded-3xl">
                <ArrowUpIcon :stroke-width="1.8" class="w-5 h-5" />
            </button>
            <button v-else class="flex items-center justify-center w-8 h-8 rounded-3xl cursor-not-allowed">
                <MessageCircleDashed :stroke-width="1.8" class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, computed, defineEmits } from "vue";
import { Plus, Puzzle, MessageCircleDashed } from "lucide-vue-next";
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
import { useChatStore } from "@/stores/chat";
import { storeToRefs } from "pinia";
import useMessage from "@/composables/useMessage";

const chatStore = useChatStore();
const { selectedChatId } = storeToRefs(chatStore);
const { sendMessage } = useMessage();

const message = ref("");
const ta = ref(null);
const MAX = 120 // 增加最大高度，约5行文字
const isSentable = computed(() => {
    return message.value.trim() !== ""
})
const emit = defineEmits(['send-success'])
function autoResize() {
    if (!ta.value) return
    // 1) 先还原到自适应起点
    ta.value.style.height = 'auto'
    // 2) 再按内容撑高，但 ≤ MAX
    const newHeight = Math.min(ta.value.scrollHeight, MAX)
    ta.value.style.height = newHeight + 'px'
    // 3) 超过MAX时显示滚动条
    ta.value.style.overflowY = ta.value.scrollHeight > MAX ? 'auto' : 'hidden'
}

const doSendMessage = async () => {
    if (!isSentable.value) return
    const messageData = {
        chat_id: selectedChatId.value,
        message_content: message.value,
        is_ai: 0,
    }
    const res = await sendMessage(messageData)
    if (res) {
        emit('send-success', res)
        message.value = "" // 清空输入框
        autoResize() // 重置高度
    }
    console.log(res);
}

/* 初次挂载后立即计算一次，避免刷新时高度过小 */
nextTick(autoResize)
</script>