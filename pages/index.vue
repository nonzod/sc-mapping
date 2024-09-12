<template>
  <div class="w-full">
    <h1>Star Citizen device mapping</h1>

    <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

    <Form class="max-w-sm mx-auto" v-slot="{ values }" :validation-schema="validation_schema" @submit="onSubmit">

      <Field name="file_xml" v-slot="{ handleChange, handleBlur }">
        <input type="file" @change="handleChange" @blur="handleBlur" @input="handleFileInput" />
      </Field>

      <ErrorMessage name="file_xml" />

      <label class="select" for="device-type">Tipo di dispositivo</label>
      <Field as="select" id="device-type" name="device_type">
        <option value="">Select</option>
        <option :value="device_type.name" v-for="device_type in appConfig.supported_devices.types">{{ device_type.label }}</option>
      </Field>
      <ErrorMessage name="device_type" />

      <label class="input" for="device-type">Numero di dispositivi</label>
      <Field name="num_of_devices" type="radio" value="1" /> 1
      <Field name="num_of_devices" type="radio" value="2" /> 2
      <ErrorMessage name="num_of_devices" />

      <button type="submit" class="btn-1">Upload</button>
    </Form>

    <section class="w-full">
      <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="px-4 py-2 border-b border-gray-200 dark:border-gray-600" v-for="profile in profiles">
          <button @click="deleteProfile(profile.uuid)" class="text-xs text-red-800">DEL</button> :: <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download external>XML</NuxtLink> ::
          <NuxtLink :to="{ name: 'profiles-uuid', params: { uuid: profile.uuid } }">[{{ profile.device_type }}] {{ profile.name }} - v{{ profile.version }}</NuxtLink>
        </li>
      </ul>
  </section>
  </div>
</template>
<script setup lang="ts">
const { handleFileInput, files } = useFileStorage()
const appConfig = useAppConfig()
const alert_type = ref('')
const alert_message = ref('')

// Validazione
const validation_schema = {
  num_of_devices: (value: number) => {
    if (value && (value > 0 && value < 3)) {
      return true;
    }

    return 'Indica il numero di device configurati 1 o 2';
  },
  device_type: (value: string) => {
    if (value)
      return true;

    return 'Seleziona il tipo di dispositivo';
  },
  file_xml: (value: File) => {
    if (value && value.type == "text/xml") {
      return true
    }

    return "Carica il file XML del profilo"
  }
};

/**
 * List Profiles
 */
const { data: profiles } = await useFetch('/api/profiles', {
  watch: [alert_message]
})

/**
 * Add Profile
 */
async function onSubmit(values: any) {
  const response: any = await $fetch('/api/files', {
    method: 'POST',
    body: {
      files: files.value,
      device_type: values.device_type,
      num_of_devices: values.num_of_devices
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

  if (!response) {
    alert_message.value = `${response}`
    alert_type.value = 'danger'

    return
  }
    

  alert_message.value = `${response.profile} (${response.uuid}) Eliminato!`
  alert_type.value = 'success'
}
</script>