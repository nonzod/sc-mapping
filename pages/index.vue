<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <FormsUploadProfile v-model:alert_type="alert_type" v-model:alert_message="alert_message"
    v-if="global_store.loggedIn" />

  <section class="w-full mt-5">
    <h2>Profiles</h2>

    <table>
      <thead>
        <tr>
          <th scope="col">
            Layout
          </th>
          <th scope="col">
            Profile name
          </th>
          <th scope="col">
            Bindings
          </th>
          <th scope="col" class="w-1/6">
            Download
          </th>
          <th scope="col" class="w-1/6" v-if="global_store.loggedIn">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="with-hover hover:cursor-pointer" v-for="profile in profiles">
          <th scope="row" @click="goToDetails(profile.uuid)">
            {{ profile.device_type }}
          </th>
          <th scope="row" @click="goToDetails(profile.uuid)">
            {{ profile.name }}
          </th>
          <th scope="row" @click="goToBindings(profile.uuid)">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24" v-if="profile.device_type == 'Canvas'">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24" v-else>
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </th>
          <td>
            <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download
              external>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
            </NuxtLink>
          </td>
          <td @click="deleteProfile(profile.uuid)" v-if="global_store.loggedIn">
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
const alert_type = ref('')
const alert_message = ref('')
const global_store: any = useGlobalStore()

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