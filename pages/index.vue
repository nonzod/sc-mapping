<template>
  <div>
    <h1>Star Citizen</h1>


    <p>{{ approveUpload }}</p>

    <div>
      <input type="file" @input="handleFileInput" />

      <button @click="submit">Upload</button>
    </div>

    <ul class="" v-for="profile in profiles">
      <li class="text-xl text-red-800">
        <NuxtLink :to="{ name: 'profiles-uuid', params: { uuid: profile.uuid } }">{{ profile.name }} (v{{ profile.version }})</NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const { handleFileInput, files } = useFileStorage()
const approveUpload = ref('')

const { data: profiles } = await useFetch('/api/profiles', {
  watch: [approveUpload]
})

const submit = async () => {
  const response = await $fetch('/api/files', {
    method: 'POST',
    body: {
      files: files.value
    }
  })

  if (!response)
    return

  approveUpload.value = 'File caricato!'

}

</script>