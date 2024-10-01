<template>
  <h1>Star Citizen device mapping</h1>

  <AppAlert :type="alert_type">{{ alert_message }}</AppAlert>

  <FormsUploadProfile v-model:alert_type="alert_type" v-model:alert_message="alert_message"
    v-if="global_store.loggedIn" />
  <div v-else>
    <div
      class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
      role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">Warning!</span> In order to upload your XML file you need an account: <NuxtLink
          to="/user/register">register here</NuxtLink>
      </div>
    </div>
    <p>This tool is used to display your button configuration for Star Citizen. By uploading your XML file, you can
      view the mapping in various ways:</p>
    <ul>
      <li>As a table</li>
      <li>As a customizable canvas, you can save and load your personalized layout</li>
      <li>As a specific layout for your joystick (not yet available)</li>
    </ul>
    <p class="mt-3">In the future, it will also be possible to perform button mapping and other profile modification activities.</p>
    <a href="/user/register" class="btn-yellow m-auto block w-fit">register now</a>
  </div>
  <section class="w-full mt-5">
    <h2>Profiles</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">
            Layout
          </th>
          <th scope="col">
            Profile name
          </th>
          <th scope="col">
            Bindings
          </th>
          <th scope="col" class="w-1/6">
            Download
          </th>
          <th scope="col" class="w-1/6" v-if="global_store.loggedIn">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="with-hover hover:cursor-pointer" v-for="profile in profiles">
          <th scope="row" @click="goToDetails(profile.uuid)">
            {{ profile.device_type }}
          </th>
          <th scope="row" @click="goToDetails(profile.uuid)">
            {{ profile.name }}
          </th>
          <th scope="row" @click="goToBindings(profile.uuid)">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24" v-if="profile.device_type == 'Canvas'">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24" v-else>
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </th>
          <td>
            <NuxtLink :to="`/api/files/${profile.uuid}`" target="_blank" class="text-xs text-green-800" download
              external>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
              </svg>
            </NuxtLink>
          </td>
          <td @click="deleteProfile(profile.uuid)" v-if="global_store.loggedIn">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>

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
const router = useRouter()
const alert_type = ref('')
const alert_message = ref('')
const page = ref(1)
const global_store: any = useGlobalStore()
const appConfig = useAppConfig()

const currentPage: string = function (idx: number): string {
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

    alert_message.value = `${response.profile} (${response.uuid}) Eliminato!`
    alert_type.value = 'success'

  } catch (e: any) {
    alert_message.value = e.statusMessage
    alert_type.value = 'danger'
  }
}

const goToBindings = (uuid: string) => {
  router.push({ name: 'bindings-uuid', params: { uuid: uuid } })
}

const goToDetails = (uuid: string) => {
  router.push({ name: 'profiles-uuid', params: { uuid: uuid } })
}

const goToPage = (idx: number) => {
  page.value = idx
}
</script>