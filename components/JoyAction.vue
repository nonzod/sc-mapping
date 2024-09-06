<template>
  <li class="flex gap-2"><span class="text-red-600" v-html="label"></span> <div class="text-sm" v-html="action"></div></li>
</template>
<script setup lang="ts">
defineProps(['action', 'label'])
</script>