<template>
  <Form class="max-w-sm mx-auto" v-slot="{ values }" :validation-schema="validation_schema" @submit="onSubmit">
    <div class="mb-5">
      <label class="input" for="device-type">File XML</label>
      <Field name="file_xml" v-slot="{ handleChange, handleBlur }">
        <input type="file" @change="handleChange" @blur="handleBlur" @input="handleFileInput" />
      </Field>

      <ErrorMessage name="file_xml" />
    </div>
    <div class="mb-5">
      <label class="select" for="device-type">Tipo di dispositivo</label>
      <Field as="select" id="device-type" name="device_type">
        <option value="">Select</option>
        <option :value="device_type.name" v-for="device_type in appConfig.supported_devices.types">{{
          device_type.label }}</option>
      </Field>
      <ErrorMessage name="device_type" />
    </div>
    <div class="mb-5">
      <label class="input" for="device-type">Numero di dispositivi</label>
      <Field name="num_of_devices" type="radio" value="1" /> 1
      <Field name="num_of_devices" type="radio" value="2" /> 2
      <ErrorMessage name="num_of_devices" />
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