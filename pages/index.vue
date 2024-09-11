<template>
  <div class="w-full">
    <h1>Star Citizen device mapping</h1>

    <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

    <form class="max-w-sm mx-auto">
      <label class="file-input" for="file-xml">File XML</label>
      <input type="file" id="file-xml" @input="handleFileInput" />

      <label class="select" for="device-type">Tipo di dispositivo</label>
      <select id="device-type" v-model="device_type">
        <option value="">Seleziona il tipo</option>
        <option value="FlightStick">FightStick</option>
      </select>

      <label class="input" for="device-type">Numero di dispositivi</label>
      <input type="number" v-model="num_of_devices" />

      <button class="btn-1" @click="submit">Upload</button>
    </form>

    <ul
      class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      v-for="profile in profiles">
      <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <button @click="deleteProfile(profile.uuid)" class="text-xs text-red-800">DEL</button>
        <NuxtLink :to="{ name: 'profiles-uuid', params: { uuid: profile.uuid } }">{{ profile.name }} - v{{
          profile.version }}</NuxtLink>
        <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" external>XML
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { handleFileInput, files } = useFileStorage()

const alert_type = ref('')
const alert_message = ref('')
const device_type = ref('')
const num_of_devices = ref('')

/**
 * List Profiles
 */
const { data: profiles } = await useFetch('/api/profiles', {
  watch: [alert_message]
})

/**
 * Add Profile
 */
const submit = async () => {
  const response: any = await $fetch('/api/files', {
    method: 'POST',
    body: {
      files: files.value,
      device_type: device_type.value,
      num_of_devices: num_of_devices.value
    }
  })

  if (!response)
    return

  alert_message.value = `${response.profile} (${response.uuid}) Creato!`
  alert_type.value = 'success'
}

/**
 * Delete Profile
 */
const deleteProfile = async (uuid: string) => {
  const response: any = await $fetch('/api/profiles/delete/' + uuid, {
    method: 'GET',
  })

  if (!response)
    return

  alert_message.value = `${response.profile} (${response.uuid}) Eliminato!`
  alert_type.value = 'danger'
}
</script>