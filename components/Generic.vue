<template>
  <div>
    <h2>Generic device</h2>

    <div class="w-1/2">
      <h4 class="font-semibold">BUTTONS {{ props.device }}</h4>
      <ul v-for="item in filtered">
        <JoyAction :label="item.button" :action="item.action" />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['items', 'device', 'inverted'])

const filtered = props.items.filter((item: any) => item.device == props.device)

</script>