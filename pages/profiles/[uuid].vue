<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="p-6 space-y-6" v-else>
    <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      <ul>
        <li>Nome: {{ profile.name }}</li>
        <li>User: {{ profile.user_id }}</li>
        <li>Type: {{ profile.device_type }}</li>
        <li>UUID: {{ profile.uuid }}</li>
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
const { gtag } = useGtag()

const { data: profile } = await useLazyFetch(`/api/profiles/${route.params.uuid}`);
const { data: devices } = await useLazyFetch(`/api/profiles/device/${route.params.uuid}`);
const { data: items, status } = await useLazyFetch(`/api/profiles/binding/${route.params.uuid}`);

// SSR-ready
gtag('event', 'screen_view', {
  app_name: 'sc-mapping',
  screen_name: 'Dettaglio profilo'
})

</script>