<template>
  <Form class="lg:w-1/2 sm:w-full" v-slot="{ values }" :validation-schema="validation_schema" @submit="onSubmit">
    <div class="mb-5">
      <label class="input" for="device-type">File XML</label>
      <Field name="file_xml" v-slot="{ handleChange, handleBlur }">
        <input type="file" @change="handleChange" @blur="handleBlur" @input="handleFileInput" />
      </Field>
      <ErrorMessage name="file_xml" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <label class="select" for="device-type">Tipo di dispositivo</label>
      <Field as="select" id="device-type" name="device_type">
        <option value="">Select</option>
        <option :value="device_type.name" v-for="device_type in appConfig.supported_devices.types">{{
          device_type.label }}</option>
      </Field>
      <ErrorMessage name="device_type" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>

    <button type="submit" class="btn-1">Upload</button>
  </Form>
</template>
<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate';

const { handleFileInput, files } = useFileStorage()
const alert_message = defineModel('alert_message')
const alert_type = defineModel('alert_type')
const appConfig = useAppConfig()

// Validazione
const validation_schema = {
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
 * Add Profile
 */
async function onSubmit(values: any) {
  const response: any = await $fetch('/api/files', {
    method: 'POST',
    body: {
      files: files.value,
      device_type: values.device_type
    }
  })

  if (!response)
    return

  alert_message.value = `${response.profile} (${response.uuid}) Creato!`
  alert_type.value = 'success'
}
</script>