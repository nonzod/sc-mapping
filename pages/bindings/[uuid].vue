<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div class="" v-else>
    <div class="container">
      {{ position }}
      <div ref="interactableTarget" style="width: 100px; height: 100px; background-color: #29e;"></div>
      <div ref="interactableTarget2" style="width: 50px; height: 50px; background-color: #ddd;"></div>
      <button class="reset-btn" @click="reset">Reset</button>
    </div>

    <div class="flex">
      <component :is="DeviceType" :items="items" :device="device" class="w-1/2" v-for="device in devices" />
    </div>

  </div>
</template>
<script setup lang="ts">
import { useInteractContext, useDraggable } from 'vue-interact';
import interact from "interactjs";

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
  import(`../../components/Devices/${profile.value.device_type}.vue`)
)

// Test interact
const interactableTarget = ref(null);
const interactableTarget2 = ref(null);

const context = useInteractContext(interactableTarget);
const { init, position } = useDraggable(context);

const context2 = useInteractContext(interactableTarget2);
const { init: init2, position: position2 } = await useDraggable(context2, {
  modifiers: [
    interact.modifiers.snap({
      targets: [
        interact.snappers.grid({ x: 30, y: 30 })
      ],
      range: Infinity,
      relativePoints: [{ x: 0, y: 0 }]
    })
  ],
  inertia: true
})

onMounted(() => {
  nextTick(() => {
    init()
    init2()
    reset()
  })
})

const reset = () => {
  position2.value.x = 100
  position2.value.y = 300
}
</script>