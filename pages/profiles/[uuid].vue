<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="flex">
      <component :is="DeviceType" :items="items" :device="`js${device_num}`" class="w-1/2" v-for="device_num in profile[0].num_of_devices" />
    </div>

  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data: profile } = await useLazyFetch(`/api/profiles/${route.params.uuid}`);
const { data: items, status } = await useLazyFetch(`/api/profiles/binding/${route.params.uuid}`);

const DeviceType = defineAsyncComponent(() =>
  import(`../../components/Devices/${profile.value[0].device_type}.vue`)
)
</script>