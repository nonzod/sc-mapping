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
    

    <button type="submit" class="btn-1">Login!</button>

  </Form>
</template>
<script lang="ts" setup>
import * as zod from 'zod';
import { sha256 } from 'js-sha256';
import { Field, Form, ErrorMessage } from 'vee-validate';

const global_store: any = useGlobalStore()
const router = useRouter()
const message = ref('')

// Validazione
const usernameValidator = toTypedSchema(
  zod.string().min(3, { message: 'It must be at least 3 characters' })
);
const passwordValidator = toTypedSchema(
  zod.string().min(8, { message: 'It must be at least 8 characters' })
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