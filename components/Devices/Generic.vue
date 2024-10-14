<template>
  <div class="w-full">
    <h2 class="mb-2">{{ device.name }} {{ device.instance }}</h2>

    <p class="font-semibold">{{ device.name }}</p>
    <table>
      <thead>
        <tr>
          <th scope="col" :class="{ active: activeFilter === 'name' }" class="hover:cursor-pointer"
            @click="sortBy('name')">
            Nome
          </th>
          <th scope="col" :class="{ active: activeFilter === 'action' }">
            Action
          </th>
          <th scope="col" :class="{ active: activeFilter === 'section' }" class="hover:cursor-pointer"
            @click="sortBy('section')">
            Section
          </th>
        </tr>
      </thead>
      <tbody :key="activeFilter">
        <tr class="compact with-hover hover:cursor-crosshair" v-for="button in props.device.buttons">
          <th class="hover:text-red-400">
            {{ button.name }}
          </th>
          <td class="hover:text-green-400 hover:font-bold flex flex-col">
            <div v-for="action in button.actions">
              {{ action.name }}
              <span class="badge badge-purple ml-2" v-if="action.activationMode"> {{ action.activationMode }}</span>
              <span class="badge badge-pink ml-2" v-if="action.multiTap"> multitap: {{ action.multiTap }}</span>
            </div>
          </td>
          <td class="hover:text-green-400">
            {{ button.section }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['device'])

const activeFilter = ref('Tutti')
const sortReversed = ref({ name: false, section: false })

function sortBy(type: Filters) {
  activeFilter.value = type
  sortReversed.value[type] = !sortReversed.value[type]

  props.device.buttons.sort(compare)

  activeFilter.value = 'processed'
}

function compare(a: Button, b: Button) {
  if (activeFilter.value === 'Tutti')
    return 0
  const attivo = activeFilter.value
  // @ts-ignore
  const reverse = sortReversed.value[activeFilter.value]

  if (reverse) {
    // @ts-ignore
    return b[activeFilter.value].localeCompare(a[activeFilter.value]);
  }
  // @ts-ignore
  return a[activeFilter.value].localeCompare(b[activeFilter.value]);
}

type Filters = "name" | "section"
</script>