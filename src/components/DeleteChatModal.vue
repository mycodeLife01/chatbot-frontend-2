<template>
    <!-- Modal Overlay -->
    <Teleport to="body">
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <!-- Modal Card -->
            <div class="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4">
                    <h3 class="text-lg font-semibold">删除对话</h3>
                    <button class="p-1.5 hover:bg-gray-200 rounded-full" @click="$emit('closeDeleteChatModal')">
                        <X class="w-5 h-5" />
                    </button>
                </div>

                <!-- Body -->
                <form class="px-6 py-6 space-y-4" @submit.prevent="$emit('onDeleteChatModal')">
                    <span>
                        确定要删除这个对话吗？
                    </span>
                    <div class="flex justify-end gap-2">
                        <button @click="$emit('closeDeleteChatModal')"
                            class="w-16 py-2 rounded-2xl hover:opacity-90 text-black font-medium border border-gray-400 hover:bg-gray-200">
                            取消
                        </button>
                        <button type="submit"
                            class="w-16 py-2 rounded-2xl bg-red-500 hover:opacity-90 text-white font-medium">
                            删除
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { X } from 'lucide-vue-next'
const emit = defineEmits(['onDeleteChatModal', 'closeDeleteChatModal'])
</script>
