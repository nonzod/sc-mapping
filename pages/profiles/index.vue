<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <section class="w-full mt-5">
    <h2>All profiles</h2>
    <!-- Table -->
    <table>
      <thead>
        <tr>
          <th scope="col">
            Profile
          </th>
          <th scope="col">
            Author
          </th>
          <th scope="col">
            Info
          </th>
          <th scope="col" class="w-1/6">
            XML
          </th>
          <th scope="col" class="w-1/6" v-if="is_admin">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="with-hover hover:cursor-pointer" v-for="profile in profiles">
          <th scope="row" @click="navigateTo({path: `/bindings/${profile.uuid}`})">
            {{ profile.name }}
          </th>
          <th scope="row" @click="navigateTo({path: `/bindings/${profile.uuid}`})">
            {{ profile.username }}
          </th>
          <td scope="row" @click="navigateTo({path: `/profiles/${profile.uuid}`})">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="#057A55" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </td>
          <td>
            <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download
              external>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#7E3AF2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
            </NuxtLink>
          </td>
          <td @click="deleteProfile(profile.uuid)" v-if="is_admin">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="#E02424" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <nav aria-label="Page navigation" class="mt-4" v-if="needPagination()">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <!--<li>
          <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>-->
        <li class="mt-1" v-for="idx in pages">
          <a href="#" :class="currentPage(idx)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="goToPage(idx)">{{ idx }}</a>
        </li>
        <!--<li>
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>-->
      </ul>
    </nav>
  </section>
</template>
<script setup lang="ts">
const alert_type = ref('')
const alert_message = ref('')
const page = ref(1)
const global_store: any = useGlobalStore()
const appConfig = useAppConfig()
const is_admin = global_store.value.loggedIn && global_store.value.user.role == 'admin' ? true : false

const currentPage: string = function(idx: number): string {
  if (idx == page.value) {
    return 'bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
  }

  return ''
}
/**
 * 
 */
const { data: res_count } = await useFetch('/api/profiles/count')
const count: number = res_count.value?.count || 1
const pages = count > appConfig.itemPerPage ? Math.floor(count / appConfig.itemPerPage) : 1

/**
 * List Profiles
 */
const { data: profiles } = await useFetch('/api/profiles', {
  method: 'POST',
  body: {
    p: page,
    ps: appConfig.itemPerPage
  },
  watch: [alert_message, page]
})

const needPagination = function () {
  return count > appConfig.itemPerPage ? true : false
}

/**
 * Delete Profile
 */
const deleteProfile = async (uuid: string) => {
  try {
    const response: any = await $fetch('/api/profiles/delete/' + uuid, {
      method: 'GET',
    })

    alert_message.value = `${response.profile} (${response.uuid}) deleted!`
    alert_type.value = 'success'

  } catch (e: any) {
    alert_message.value = e.statusMessage
    alert_type.value = 'danger'
  }
}

const goToPage = (idx: number) => {
  page.value = idx
}
</script>