<template>
    <!-- Modal Overlay -->
    <Teleport to="body">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <!-- Modal Card -->
            <div class="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4">
                    <h3 class="text-lg font-semibold">修改对话名</h3>
                    <button class="p-1.5 hover:bg-gray-200 rounded-full" @click="$emit('closeUpdateChatModal')">
                        <X class="w-5 h-5" />
                    </button>
                </div>

                <!-- Body -->
                <form class="px-6 py-6 space-y-4" @submit.prevent="$emit('onUpdateChatModal', newChatName)">
                    <div>
                        <label class="block text-sm mb-1 text-gray-700">新的对话名</label>
                        <input v-model="newChatName" type="text" placeholder="请输入新的对话名"
                            class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                    </div>
                    <button type="submit"
                        class="w-full py-2 rounded-2xl bg-gradient-to-r from-gray-600 to-black hover:opacity-90 text-white font-medium disabled:opacity-70">
                        修改
                    </button>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
const emit = defineEmits(['onUpdateChatModal', 'closeUpdateChatModal'])
const newChatName = ref('')
</script>
