<template>
    <!-- Modal Overlay -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="$emit('closeLoginModal')">
        <!-- Modal Card -->
        <div class="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4">
                <h3 class="text-lg font-semibold">登录</h3>
                <button class="p-1.5 hover:bg-gray-200 rounded-full" @click="$emit('closeLoginModal')">
                    <X class="w-5 h-5" />
                </button>
            </div>

            <!-- Body -->
            <form class="px-6 py-6 space-y-4" @submit.prevent="submitLogin">
                <div>
                    <label class="block text-sm mb-1 text-gray-700">用户名</label>
                    <input v-model="username" type="text" placeholder="请输入用户名"
                        class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-gray-700">密码</label>
                    <input v-model="password" type="password" placeholder="请输入密码"
                        class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
                <button type="submit" :disabled="loading"
                    class="w-full py-2 rounded-2xl bg-gradient-to-r from-gray-600 to-black hover:opacity-90 text-white font-medium disabled:opacity-70">
                    {{ loading ? '登录中...' : '登录' }}
                </button>
                <div class="flex justify-center text-red-500 text-sm">
                    {{ errorMsg }}
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import useAuth from '@/composables/useAuth'
import { ref } from 'vue'
const { loginUser, registerUser, getUser } = useAuth()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const submitLogin = async () => {
    loading.value = true
    const res = await loginUser({
        username: username.value,
        password: password.value
    })
    if (res) {
        $emit('closeLoginModal')
    } else {
        errorMsg.value = '登录失败，请稍后再试'
    }
    loading.value = false
}
</script>
