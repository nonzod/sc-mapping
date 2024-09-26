<template>
  <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
  </div>
  <button type="submit" class="btn-1" @click="onSubmit">Save layout</button>
</template>
<script lang="ts" setup>
const props = defineProps(['device', 'canvas'])
const message = ref('')

// Action
async function onSubmit(values: any) {
  try {
    const response: any = await $fetch(`/api/device/${props.device.id}`, {
      method: 'POST',
      body: {
        canvas: JSON.stringify(props.canvas.toJSON())
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
</script>