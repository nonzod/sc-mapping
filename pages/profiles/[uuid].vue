<template>
  <div class="p-6 space-y-6">
    <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      <ul>
        <li>Nome: {{ profile?._profileName }}</li>
        <li>User: {{ profile?.authorId.username }}</li>
        <li>Version: {{ profile?._version }}</li>
        <li>ID: {{ profile?._id }}</li>
      </ul>
    </div>
    <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400" v-for="device in devices">
      {{ device.name }}
      <ul>
        <li>prefix: {{ device.prefix }}</li>
        <li>instance: {{ device.instance }}</li>
        <li>type: {{ device.type }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data: profile } = await useLazyFetch(`/api/profiles/${route.params.uuid}`);
const { data: devices } = await useLazyFetch(`/api/profiles/device/${route.params.uuid}`);
</script>