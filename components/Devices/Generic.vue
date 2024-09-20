<template>
  <div>
    <h2>Generic device</h2>

    <div class="w-1/2">
      <h3 class="font-semibold">{{ props.device.prefix }} : {{ props.device.name }}</h3>
      <ul v-for="button in buttons">
        <JoyAction :label="button.name" :action="button.actions?.join('<br />')" />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['items', 'device', 'inverted'])
var buttons: Button[] = []

const filtered = props.items.filter((item: any) => item.device == props.device.prefix)

filtered.forEach((e: any) => {
  const s = buttons.filter((button: Button) => button.hasOwnProperty('name') && button.name == e.button)

  if (s.length == 0) {
    buttons.push({
      name: e.button,
      actions: []
    })
  }

  const idx = buttons.findIndex(elem => elem['name'] == e.button)
  // @ts-ignore
  buttons[idx].actions.push(e.action)
})

type Button = {
  name: string,
  actions?: string[]
}

</script>