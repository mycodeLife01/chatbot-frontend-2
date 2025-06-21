<template>
    <label for="chat-drawer" aria-label="open sidebar" class="lg:hidden cursor-pointer">
        <Menu :stroke-width="1.5" class="w-6 h-6" />
    </label>
    <div class="lg:hidden">
        <span>Ailura </span>
        <span class="text-gray-500 text-sm">V1</span>
    </div>
    <button class="lg:hidden w-8 h-8 hover:bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
        <PenLine :stroke-width="1.5" class="w-5 h-5" />
    </button>
</template>

<script setup>
import { PenLine, Menu } from "lucide-vue-next"
</script>
