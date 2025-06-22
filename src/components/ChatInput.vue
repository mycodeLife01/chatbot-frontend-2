<template>
    <div class="rounded-4xl w-[94%] h-auto min-h-[60px] border border-gray-300 shadow-sm 
        lg:w-[800px] p-2 bg-white select-none">
        <textarea v-model="message" ref="ta" placeholder="询问任何问题" rows="1" @input="autoResize" class="p-2 w-full resize-none
            leading-6 text-md font-medium focus:outline-none bg-transparent"></textarea>
        <div class="mt-2 flex justify-between">
            <div class="flex">
                <button class="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-gray-100 rounded-3xl">
                    <Plus :stroke-width="1.8" class="w-5 h-5" />
                </button>
                <div class="flex items-center justify-evenly w-16 h-8 cursor-pointer hover:bg-gray-100 rounded-3xl">
                    <button>
                        <Puzzle :stroke-width="1.8" class="w-5 h-5 " />
                    </button>
                    <span class="text-sm">工具</span>
                </div>
            </div>
            <button
                class="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-black hover:text-white rounded-3xl">
                <ArrowUpIcon :stroke-width="1.8" class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { Plus, Puzzle } from "lucide-vue-next";
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
const message = ref("");
const ta = ref(null);
const MAX = 120 // 增加最大高度，约5行文字
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

/* 初次挂载后立即计算一次，避免刷新时高度过小 */
nextTick(autoResize)
</script>