<template>
  <div class="container mx-auto flex flex-col min-h-screen">
    <AppHeader />
    <main class="mt-5 mb-5">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>