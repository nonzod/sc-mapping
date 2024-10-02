<template>
  <!-- you will need to handle a loading state -->
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div class="sm:hidden">
      <select id="tabs" @change="changeTab($event?.target?.value)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(device, idx) in devices" :value="idx">{{ device.type }} {{ device.instance }}</option>
      </select>
    </div>

    <div class="m-auto w-fit">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button @click="navigateTo(`/bindings/${route.params.uuid}/Generic`)" type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          <svg class="w-[12px] h-[12px] w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2"
              d="M3 11h18m-9 0v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
          </svg>
          Table
        </button>
        <button @click="navigateTo(`/bindings/${route.params.uuid}/Canvas`)" type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
          <svg class="w-[12px] h-[12px] w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z" />
            <path fill-rule="evenodd"
              d="M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z"
              clip-rule="evenodd" />
          </svg>
          Canvas editor
        </button>
      </div>
    </div>

    <div
      class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
      <ul class="flex flex-wrap -mb-px custom">
        <li class="me-2" v-for="(device, idx) in devices">
          <a href="#"
            class="inline-block p-4 border-b-2 hover:no-underline border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            @click="changeTab(idx)">{{ device.type }} {{ device.instance }}</a>
        </li>
      </ul>
    </div>


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
const device_type = ref('Generic')

device_type.value = profile?.value?.device_type
if (route.params.layout) {
  device_type.value = route.params.layout
}

const DeviceType = defineAsyncComponent(() =>
  import(`../../../components/Devices/${device_type.value}.vue`)
)

function changeTab(idx: number) {
  device.value = 0 // trigger fetch
  device.value = devices.value ? devices.value[idx] : {}
}

onMounted(() => {
  device.value = devices.value ? devices.value[0] : {}

  // Track layout
  if (profile.value) {
    useGtm()?.trackView(profile.value.device_type, '/bindings/uuid')
  }
})
</script>