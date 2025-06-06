<template>
    <div class="flex h-screen w-screen">
    <aside class="hidden md:block w-sidebar bg-gray-100">
      <slot name="sidebar"></slot>
    </aside>
    <main>
      <header>
        <slot name="header"></slot>
      </header>
      <div>
        <slot name="chat-content"></slot>
      </div>
    </main>
  </div>
</template>