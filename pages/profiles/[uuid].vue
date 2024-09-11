<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="flex">
      <component :is="DeviceType" :items="items" device="js1" inverted="true" class="w-1/2" />
      <component :is="DeviceType" :items="items" device="js2" inverted="true" class="w-1/2" />
    </div>
    
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const { data: items, status } = await useLazyFetch(`/api/profiles/${route.params.uuid}`);

  const DeviceType = defineAsyncComponent(() =>
    import('../../components/FlightStick.vue')
  )
</script>