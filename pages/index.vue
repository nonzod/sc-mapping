<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <FormsUploadProfile v-model:alert_type="alert_type" v-model:alert_message="alert_message" />

  <section class="w-full mt-5">
    <h2>Profili caricati</h2>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Tipo
          </th>
          <th scope="col" class="px-6 py-3">
            Profilo
          </th>
          <th scope="col" class="px-6 py-3">
            Versione
          </th>
          <th scope="col" class="px-6 py-3 w-1/6">
            Download
          </th>
          <th scope="col" class="px-6 py-3 w-1/6">
            Elimina
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer" v-for="profile in profiles">
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white" @click="goToProfile(profile.uuid)">
            {{ profile.device_type }}
          </th>
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white" @click="goToProfile(profile.uuid)">
            {{ profile.name }}
          </th>
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white" @click="goToProfile(profile.uuid)">
            {{ profile.version }}
          </th>
          <td class="px-6 py-4">
            <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download
              external>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
            </NuxtLink>
          </td>
          <td class="px-6 py-4">
            <button @click="deleteProfile(profile.uuid)" class="text-xs text-red-800">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script setup lang="ts">
const router = useRouter()
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

const goToProfile = (uuid: string) => {
  router.push({ name: 'profiles-uuid', params: { uuid: uuid } })
}
</script>