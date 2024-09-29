<template>
  <h2 class="mb-5">{{ alert_message }}</h2>

  <div class="flex flex-col items-center justify-center" v-if="passed">
  <div
    class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 w-fit"
    role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-bold">Verified address!</span> 
      <NuxtLink to="/user/login" class="ml-2">Please login</NuxtLink> to upload your XML file
    </div>
  </div>

  <button @click="navigateTo({ 'path': '/user/login' })" class="btn-1 w-fit">Login!</button>
</div>
</template>
<script lang="ts" setup>
const route = useRoute()
const alert_message = ref('Verifing...')
const passed = ref(false)

const { data: res, status: status, error: error } = await useFetch(`/api/auth/onetime/${route.params.key}`)

if (status.value != "success") {
  alert_message.value = error.value
} else {
  alert_message.value = 'Verified address!'

  passed.value = true
}
</script>