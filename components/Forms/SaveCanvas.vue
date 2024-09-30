<template>
  <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
  </div>
  <button type="submit" class="btn-green" @click="onSubmit">Save layout</button>
  <button type="submit" class="btn-red" @click="onReset">Delete saved</button>
  <NuxtLink :href="href" @click="onSVG()" download="file.svg" class="btn-1 p-3 hover:no-underline	">Donwload SVG</NuxtLink>
</template>
<script lang="ts" setup>
const props = defineProps(['device', 'canvas', 'canvas_grid'])
const message = ref('')
const href = ref('')

// Action
async function onSubmit(values: any) {
  try {
    const response: any = await $fetch(`/api/device/${props.device.id}`, {
      method: 'POST',
      body: {
        canvas: JSON.stringify(props.canvas.toJSON()),
        canvas_grid: JSON.stringify(props.canvas_grid)
      }
    })

  } catch (response: any) {
    message.value = 'Salvataggio fallito!'

    return {
      statusCode: response.statusCode,
      message: response.message
    }
  }
}

async function onReset() {
  try {
    const response: any = await $fetch(`/api/device/${props.device.id}`, {
      method: 'POST',
      body: {
        canvas: '{}',
        canvas_grid: '{}'
      }
    })

  } catch (response: any) {
    message.value = 'Salvataggio fallito!'

    return {
      statusCode: response.statusCode,
      message: response.message
    }
  }
}

function onSVG() {
  //document.open('data:Application/octet-stream,' + props.canvas.toSVG())
  console.log(props.canvas.toSVG())

  const blob = new Blob([props.canvas.toSVG()], { type: "text/plain" });
  href.value = window.URL.createObjectURL(blob)
}
</script>