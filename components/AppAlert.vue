<template>
  <div class="alert" :class="type" role="alert">
    <slot />
  </div>
</template>
<script setup lang="ts">
  defineProps(['type'])
</script>