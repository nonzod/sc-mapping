<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="flex">
      <component :is="DeviceType" :items="items" :device="device" class="w-1/2" v-for="device in devices" />
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

const DeviceType = defineAsyncComponent(() =>
  import(`../../components/Devices/${profile?.value?.device_type}.vue`)
)
</script>