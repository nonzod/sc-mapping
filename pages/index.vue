<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <FormsUploadProfile v-model:alert_type="alert_type" v-model:alert_message="alert_message" v-if="loggedIn" />

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
            Dettagli
          </th>
          <th scope="col" class="px-6 py-3 w-1/6">
            Download
          </th>
          <th scope="col" class="px-6 py-3 w-1/6" v-if="loggedIn">
            Elimina
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer"
          v-for="profile in profiles">
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            @click="goToDetails(profile.uuid)">
            {{ profile.device_type }}
          </th>
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            @click="goToDetails(profile.uuid)">
            {{ profile.name }}
          </th>
          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            @click="goToBindings(profile.uuid)">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
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
          <td class="px-6 py-4" @click="deleteProfile(profile.uuid)" v-if="loggedIn">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script setup lang="ts">
const router = useRouter()
const { gtag } = useGtag()
const alert_type = ref('')
const alert_message = ref('')
const { loggedIn } = useUserSession()

// SSR-ready
gtag('event', 'screen_view', {
  app_name: 'sc-mapping',
  screen_name: 'Home'
})

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

  try {
    const response: any = await $fetch('/api/profiles/delete/' + uuid, {
      method: 'GET',
    })

    alert_message.value = `${response.profile} (${response.uuid}) Eliminato!`
    alert_type.value = 'success'

  } catch (e: any) {
    alert_message.value = e.statusMessage
    alert_type.value = 'danger'
  }

}

const goToBindings = (uuid: string) => {
  router.push({ name: 'bindings-uuid', params: { uuid: uuid } })
}

const goToDetails = (uuid: string) => {
  router.push({ name: 'profiles-uuid', params: { uuid: uuid } })
}
</script>