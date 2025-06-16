<template>
    <div class="flex h-screen w-screen">
    <aside class="hidden md:block w-sidebar bg-gray-100">
      <!-- 这里改成SideBar组件 -->
      <slot name="sidebar"></slot>
    </aside>
    <main>
      <header>
        <!-- 这里改成Header组件 -->
        <slot name="header"></slot>
      </header>
      <div>
        <!-- 这里改成router-view-->
        <slot name="chat-content"></slot>
      </div>
    </main>
  </div>
</template>