<template>
    <!-- Modal Overlay -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
            <form class="px-6 py-6 space-y-4" @submit.prevent="doLogin">
                <div>
                    <label class="block text-sm mb-1 text-gray-700">用户名</label>
                    <input :disabled="loading" v-model="username" type="text" placeholder="请输入用户名"
                        class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-gray-700">密码</label>
                    <input :disabled="loading" v-model="password" type="password" placeholder="请输入密码"
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
import { useAuthStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
const { loginUser } = useAuth()
const username = ref('')
const password = ref('')
const loading = ref(false)
const emit = defineEmits(['closeLoginModal'])
const { setErrorMsg } = useAuthStore()
const { errorMsg } = storeToRefs(useAuthStore())
const doLogin = async () => {
    if (!username.value || !password.value) {
        setErrorMsg('请输入用户名和密码')
        return
    }
    loading.value = true
    const isLoginSuccess = await loginUser({
        username: username.value,
        password: password.value
    })
    if (isLoginSuccess) {
        emit('closeLoginModal')
    }
    else {
        loading.value = false
        return
    }
}
onMounted(() => {
    setErrorMsg('')
})
</script>
