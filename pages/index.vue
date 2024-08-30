<template>
  <div>
    <h1>Star Citizen</h1>
    

    <p>{{ approveUpload }}</p>
    <div class="links">
      <a v-for="link in fileLinks" :key="link" :href="`/userFiles/specificFolder/${link}`">{{ link }}</a>
    </div>


    <div>
      <input type="file" @input="handleFileInput" />

      <button @click="submit">Upload</button>
    </div>
  </div>
</template>
<script setup lang="ts">
const { handleFileInput, files } = useFileStorage()
const fileLinks = ref<string[]>([])
const approveUpload = ref('')

const submit = async () => {
  const response = await $fetch('/api/files', {
    method: 'POST',
    body: {
      files: files.value
    }
  })

  if (!response) return
  approveUpload.value = 'File caricato!'
  fileLinks.value = response
}
</script>