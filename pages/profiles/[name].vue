<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <FlightStick :items="items"></FlightStick>
    <!--<div class="" v-for="(item, idx) in items">
      <p class="text-xl"><span class="text-red-800">{{ item.section }}</span> : {{ item.action }} : <span class="text-red-800">{{ item.button }}</span></p>
    </div>-->
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const { data: items, status } = await useLazyFetch(`/api/profiles/${route.params.name}`);
</script>