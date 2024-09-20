<template>
  <section class="w-full mt-5">
    <h2>Profili caricati</h2>

    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            id
          </th>
          <th scope="col" class="px-6 py-3">
            username
          </th>
          <th scope="col" class="px-6 py-3">
            email
          </th>
          <th scope="col" class="px-6 py-3 w-1/6">
            role
          </th>
          <th scope="col" class="px-6 py-3 w-1/6">
            consent
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <th scope="row"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ user.id }}
          </th>
          <th scope="row"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ user.username }}
          </th>
          <td class="px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ user.email }}
          </td>
          <td class="px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ user.role }}
          </td>
          <td class="px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {{ user.consent }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts" setup>
const alert_message = ref('')

/**
 * List Profiles
 */
const { data: users } = await useFetch('/api/user/list', {
  watch: [alert_message]
})

</script>