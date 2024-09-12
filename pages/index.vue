<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <FormsUploadProfile v-model:alert_type="alert_type" v-model:alert_message="alert_message" />

  <h2>Profili caricati</h2>
  <section class="w-full">
    <ul
      class="mt-5 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex gap-3" v-for="profile in profiles">
        <button @click="deleteProfile(profile.uuid)" class="text-xs text-red-800">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
          </svg>
        </button>
        <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download external>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
          </svg>
        </NuxtLink>
        <NuxtLink :to="{ name: 'profiles-uuid', params: { uuid: profile.uuid } }">[{{ profile.device_type }}] {{
          profile.name }} - v{{ profile.version }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
const alert_type = ref('')
const alert_message = ref('')

/**
 * List Profiles
 */
const { data: profiles } = await useFetch('/api/profiles', {
  watch: [alert_message]
})

/**
 * Delete Profile
 */
const deleteProfile = async (uuid: string) => {
  const response: any = await $fetch('/api/profiles/delete/' + uuid, {
    method: 'GET',
  })

  if (!response) {
    alert_message.value = `${response}`
    alert_type.value = 'danger'

    return
  }

  alert_message.value = `${response.profile} (${response.uuid}) Eliminato!`
  alert_type.value = 'success'
}
</script>