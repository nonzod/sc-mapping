<script setup lang="ts">
  const { data: actionmaps, status } = await useLazyFetch('/api/parse/actionmap');
  
</script>
<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="" v-for="actionmap in actionmaps">
      <p class="text-xl text-red-800">{{ actionmap._name }}</p>


      <div v-for="action in actionmap.action" class="flex gap-2  ml-2">
        <p class="">{{ action._name }} -> </p>

        <div v-if="action.rebind && action.rebind['_input'] !== undefined" class="flex gap-2">
          <div v-for="s in (action.rebind._input.split('_'))" class="text-green-800">
            {{ s }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>