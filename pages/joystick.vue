<script setup lang="ts">
  const { data: devices, status } = await useLazyFetch('/api/joystick');
  
</script>
<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="" v-for="(device, idx) in devices">
      <p class="text-xl text-red-800">{{ idx }}</p>

      <div class="" v-for="(button, idx) in device">
        <p class="text-xl">{{ button }}</p>
      </div>
    
    </div>
  </div>
</template>