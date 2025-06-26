<template>
    <!-- Modal Overlay -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <!-- Modal Card -->
        <div class="relative w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4">
                <h3 class="text-lg font-semibold">创建新账号</h3>
                <button class="p-1.5 hover:bg-gray-200 rounded-full" @click="$emit('closeRegisterModal')">
                    <X class="w-5 h-5" />
                </button>
            </div>

            <!-- Body -->
            <form class="px-6 py-6 space-y-4" @submit.prevent="doRegister">
                <div>
                    <label class="block text-sm mb-1 text-gray-700">用户名</label>
                    <input :disabled="loading" v-model="username" type="text" placeholder="请输入用户名"
                        class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                </div>

                <div>
                    <label class="block text-sm mb-1 text-gray-700">邮箱</label>
                    <input :disabled="loading" v-model="email" type="email" placeholder="请输入邮箱"
                        class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm mb-1 text-gray-700">密码</label>
                        <input :disabled="loading" v-model="password" type="password" placeholder="密码"
                            class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                    </div>
                    <div>
                        <label class="block text-sm mb-1 text-gray-700">确认密码</label>
                        <input :disabled="loading" v-model="repeatPassword" type="password" placeholder="再次输入"
                            class="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black" />
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full py-2 rounded-2xl bg-gradient-to-r from-gray-600 to-black hover:opacity-90 text-white font-medium disabled:opacity-70">
                    {{ loading ? '注册中...' : '注册' }}
                </button>
                <div class="flex justify-center text-red-500 text-sm">
                    {{ errorMsg }}
                </div>
            </form>

            <!-- Footer -->
            <div class="px-6 py-4 text-center text-sm">
                已有账号？
                <a href="#" class="text-blue-500 hover:underline" @click.prevent="$emit('goToLogin')">
                    立即登录
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const { registerUser } = useAuth()
const username = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const loading = ref(false)
const emit = defineEmits(['closeRegisterModal'])
const authStore = useAuthStore()
const { errorMsg } = storeToRefs(authStore)
const { setErrorMsg } = authStore
const doRegister = async () => {
    if (!username.value || !email.value || !password.value || !repeatPassword.value) {
        setErrorMsg('请输入完整信息')
        return
    }
    if (password.value !== repeatPassword.value) {
        setErrorMsg('两次密码不一致')
        return
    }
    loading.value = true
    const isRegisterSuccess = await registerUser({
        username: username.value,
        email: email.value,
        password: password.value,
        repeat_password: repeatPassword.value
    })
    if (isRegisterSuccess) {
        emit('closeRegisterModal')
    } else {
        loading.value = false
        return
    }
}
onMounted(() => {
    setErrorMsg('')
})
</script>
