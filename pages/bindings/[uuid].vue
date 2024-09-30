<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div class="sm:hidden">
      <select id="tabs" v-on:change="changeTab($event?.target?.value)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(device, idx) in devices" :value="idx">{{ device.type }} {{ device.instance }}</option>
      </select>
    </div>
    <ul
      class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400 custom mb-4">
      <li class="w-full focus-within:z-10" v-for="(device, idx) in devices">
        <a href="#"
          class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          v-on:click="changeTab(idx)">{{ device.type }} {{ device.instance }}</a>
      </li>
    </ul>

    <div class="flex">
      <component :is="DeviceType" :items="items" :device="device" :key="device.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const device = ref({})
const { data: profile } = await useFetch(`/api/profiles/${route.params.uuid}`)
const { data: items, status } = await useFetch(`/api/profiles/binding/${route.params.uuid}`)
const { data: devices } = await useFetch(`/api/profiles/device/${route.params.uuid}`, {
  watch: [device]
})

const DeviceType = defineAsyncComponent(() =>
  import(`../../components/Devices/${profile?.value?.device_type}.vue`)
)

function changeTab(idx:number) {
  device.value = 0 // trigger fetch
  device.value = devices.value ? devices.value[idx] : {}
}

onMounted(() => {
  device.value = devices.value ? devices.value[0] : {}

  // Track layout
  if(profile.value) {
    useGtm()?.trackView(profile.value.device_type, '/bindings/uuid')
  }
})
</script>