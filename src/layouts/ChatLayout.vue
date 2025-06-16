<template>
  <div class="flex h-screen w-screen">
    <aside class="hidden md:block w-sidebar bg-gray-100">
      <SideBar />
    </aside>
    <main class="w-full md:flex-1 flex flex-col">
      <header class="bg-blue-300 h-14">
        <Header />
      </header>
      <div class="flex-1 bg-red-300">
        <!-- 这里改成router-view-->
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
</script>
