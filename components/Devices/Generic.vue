<template>
  <div class="w-full">
    <h2 class="mb-2">{{ device.type }} {{ device.instance }}</h2>

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
            <div v-for="action in button.actions">
              {{ action.name }}
              <span class="badge badge-purple ml-2" v-if="action.activation_mode"> {{ action.activation_mode }}</span>
              <span class="badge badge-pink ml-2" v-if="action.multi_tap"> multitap: {{ action.multi_tap }}</span>
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
const props = defineProps(['items', 'device', 'inverted'])
const activeFilter = ref('Tutti')
const sortReversed = ref({ name: false, section: false })

var buttons: Button[] = []

const filtered: [ActionMapDbRow] = props.items.filter((item: any) => item.device == props.device.prefix)

filtered.forEach((e: ActionMapDbRow) => { // Raggruppo tutte le action di un bottone
  var formatted_actions:Array<FormattedActionMap> = []

  // Scompongo le proprietà della action
  e.action.split(',').forEach((a) => {
    var action_props:Array<string> = a.split(':')

    formatted_actions.push({
      name: action_props.shift()?.replace('v_', '').replaceAll('_', ' ').toUpperCase(),
      activation_mode: action_props.shift(),
      multi_tap: action_props.shift()
    })
  })

  // Check vuoto
  const s = buttons.filter((button: Button) => button.hasOwnProperty('name') && button.name == e.button)
  if (s.length == 0) {
    buttons.push({
      name: e.button.toUpperCase(),
      section: e.section.replaceAll('_', ' ').toUpperCase(),
      actions: formatted_actions
    })
  }

  buttons.sort(compare)
})

function sortBy(type: Filters) {
  activeFilter.value = type
  sortReversed.value[type] = !sortReversed.value[type]

  buttons.sort(compare)

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