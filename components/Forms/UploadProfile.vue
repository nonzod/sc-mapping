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
    <div class="mb-5">
      <fieldset>
        <legend class="sr-only">Numero dispositivi</legend>
        <div class="flex items-center mb-4">
          <Field name="num_of_devices" id="value-1" type="radio" value="1"
            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
          <label for="value-1" class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Singolo device
          </label>
        </div>
        <div class="flex items-center mb-4">
          <Field name="num_of_devices" id="value-2" type="radio" value="2"
            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
          <label for="value-2" class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Doppio device
          </label>
        </div>
        <ErrorMessage name="num_of_devices" class="text-sm text-red-600 dark:text-red-500" />
      </fieldset>
    </div>
    <button type="submit" class="btn-1">Upload</button>
  </Form>
</template>
<script setup lang="ts">
const { handleFileInput, files } = useFileStorage()
const alert_message = defineModel('alert_message')
const alert_type = defineModel('alert_type')
const appConfig = useAppConfig()

// Validazione
const validation_schema = {
  num_of_devices: (value: number) => {
    if (value && (value > 0 && value < 3)) {
      return true;
    }

    return 'Indica il numero di device configurati, singolo o doppio';
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
</script>