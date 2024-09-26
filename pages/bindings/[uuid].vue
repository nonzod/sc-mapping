<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="flex">
      <component :is="DeviceType" :items="items" :device="device" v-for="device in devices" />
    </div>
  </div>
</template>
<script setup lang="ts">

const route = useRoute()
const { data: profile } = await useFetch(`/api/profiles/${route.params.uuid}`);
const { data: items, status } = await useFetch(`/api/profiles/binding/${route.params.uuid}`);
const { data: devices } = await useFetch(`/api/profiles/device/${route.params.uuid}`);

const DeviceType = defineAsyncComponent(() =>
  import(`../../components/Devices/${profile?.value?.device_type}.vue`)
)
</script>