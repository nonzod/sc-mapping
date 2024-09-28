<template>
<h2>{{ alert_message }}</h2>
</template>
<script lang="ts" setup>
const route = useRoute()
const alert_message = ref('Verifing...')

const { data: res, status: status, error: error } = await useFetch(`/api/auth/onetime/${route.params.key}`)

if(status.value != "success") {
  alert_message.value = error.value
} else {
  alert_message.value = 'OK!'

  navigateTo({'path' : '/user/login'})
}
</script>