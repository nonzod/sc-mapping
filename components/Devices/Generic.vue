<template>
  <div>
    <h2>{{ device.type }} {{ device.instance }}</h2>

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
        <tr class="compact with-hover hover:cursor-crosshair" v-for="button in buttons">
          <th class="hover:text-red-400">
            {{ button.name }}
          </th>
          <td class="hover:text-green-400 hover:font-bold flex flex-col">
            <div v-for="action in button.actions">{{ action }}</div>
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
const props = defineProps(['items', 'device', 'inverted'])
const activeFilter = ref('Tutti')
const sortReversed = ref({ name: false, section: false })

var buttons: Button[] = []

const filtered = props.items.filter((item: any) => item.device == props.device.prefix)

filtered.forEach((e: any) => { // Raggruppo tutte le action di un bottone
  const s = buttons.filter((button: Button) => button.hasOwnProperty('name') && button.name == e.button)

  if (s.length == 0) {
    buttons.push({
      name: e.button,
      section: e.section,
      actions: []
    })
  }

  const idx = buttons.findIndex(elem => elem['name'] == e.button)
  // @ts-ignore
  buttons[idx].actions.push(e.action)

  buttons.sort(compare)
})

function sortBy(type: Filters) {
  activeFilter.value = type
  sortReversed.value[type] = !sortReversed.value[type]

  buttons.sort(compare)

  activeFilter.value = 'processed'

  const uno = sortReversed.value.name
  const due = sortReversed.value.section
}

function compare(a: Button, b: Button) {
  if (activeFilter.value === 'Tutti')
    return 0
  const attivo = activeFilter.value
  // @ts-expect-error
  const reverse = sortReversed.value[activeFilter.value]

  if (reverse) {
    // @ts-expect-error
    return b[activeFilter.value].localeCompare(a[activeFilter.value]);
  }

  // @ts-expect-error
  return a[activeFilter.value].localeCompare(b[activeFilter.value]);
}

type Button = {
  name: string,
  actions?: string[],
  section: string
}
type Filters = "name" | "section"
</script>