<template>
  <div class="flex flex-col md:flex-row">
  <Form class="lg:w-1/2 sm:w-full" v-slot="{ values }" :validation-schema="validation_schema" @submit="onSubmit">
    <div class="mb-5">
      <label class="input" for="device-type">XML File</label>
      <Field name="file_xml" v-slot="{ handleChange, handleBlur }">
        <input type="file" @change="handleChange" @blur="handleBlur" @input="handleFileInput" />
      </Field>
      <ErrorMessage name="file_xml" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <label class="select" for="device-type">Layout type</label>
      <Field as="select" id="device-type" name="device_type">
        <option value="">Select</option>
        <option :value="device_type.name" v-for="device_type in appConfig.supported_devices.types">{{
          device_type.label }}</option>
      </Field>
      <ErrorMessage name="device_type" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>

    <button type="submit" class="btn-1">Upload</button>
  </Form>
  <div class="lg:w-1/2 sm:w-full pl-5">
    <div class="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg class="w-6 h-6 text-gray-800 dark:text-white m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>

      <p class="mb-3 mt-3 font-normal text-gray-500 dark:text-gray-400"><em>Profile XML files are created in StarCitizen when exports Keybindings configuration.</em><br />
        With this tool you can load the XML file you find at <span class="text-xs">(install drive)\Program Files\Roberts Space Industries\StarCitizen\LIVE\USER\Client\0Controls\Mappings</span> and consult it or create a layout to visualize the layout of the buttons</p>
      
      <!-- <a href="#" class="inline-flex font-medium items-center text-blue-600 hover:underline">
          See our guideline
          <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
          </svg>
      </a>--> 
    </div>
  </div>
</div>
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

    return 'Select layout';
  },
  file_xml: (value: File) => {
    if (value && value.type == "text/xml") {
      return true
    }

    return "Select file"
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