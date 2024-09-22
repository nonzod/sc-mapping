<template>
  <h2 class="mb-5">Login</h2>
  <Form class="lg:w-1/2 sm:w-full" v-slot="{ values }" @submit="onSubmit">
    <div class="mb-5">
      <label class="input" for="username">Username</label>
      <Field type="text" id="username" name="username" :rules="usernameValidator" />
      <ErrorMessage name="username" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <label class="input" for="password">Password</label>
      <Field type="password" id="password" name="password" :rules="passwordValidator" />
      <ErrorMessage name="password" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
    </div>
    

    <button type="submit" class="btn-1">Entra!</button>

  </Form>
</template>
<script lang="ts" setup>
import * as zod from 'zod';
import { sha256 } from 'js-sha256';
const global_store: any = useGlobalStore()
const router = useRouter()
const { gtag } = useGtag()

const message = ref('')

// SSR-ready
gtag('event', 'screen_view', {
  app_name: 'sc-mapping',
  screen_name: 'Login'
})

// Validazione
const usernameValidator = toTypedSchema(
  zod.string().min(3, { message: 'Deve essere almeno 3 caratteri' })
);
const passwordValidator = toTypedSchema(
  zod.string().min(8, { message: 'Deve essere almeno 8 caratteri' })
);

// Action
async function onSubmit(values: any) {
  try {
  const response: any = await $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      username: values.username,
      password: sha256(values.password)
    }
  })

  // aggiorno il global store
  global_store.value.loggedIn = true
  global_store.value.user = response.user
  global_store.value.session = response.session

  } catch(response: any) {
    message.value = 'Login fallito!'

    return {
      statusCode: response.statusCode,
      message: response.message
    }
  } 
  
  router.push('/')
}
</script>