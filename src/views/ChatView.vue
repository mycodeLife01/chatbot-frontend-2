<template>
    <div>
        <ChatInput
            class="fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-[calc(-50%+calc(var(--width-sidebar)/2))]" />
        <BottomTip
            class="fixed bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-[calc(-50%+calc(var(--width-sidebar)/2))]" />
    </div>
</template>

<script setup>
import ChatInput from "@/components/ChatInput.vue";
import BottomTip from "@/components/BottomTip.vue";
</script>