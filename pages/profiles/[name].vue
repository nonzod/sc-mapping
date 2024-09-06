<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="flex">
      <FlightStick :items="items" device="js1" class="w-1/2"></FlightStick>
    
      <FlightStick :items="items" device="js2" class="w-1/2"></FlightStick>
    </div>
    
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const { data: items, status } = await useLazyFetch(`/api/profiles/${route.params.name}`);
</script>