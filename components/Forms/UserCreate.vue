<template>
  <h2 class="mb-5">Crea utente</h2>
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
      <label class="input" for="email">E-Mail</label>
      <Field type="email" id="email" name="email" :rules="emailValidator" />
      <ErrorMessage name="email" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
    </div>

    <button type="submit" class="btn-1">Save</button>

  </Form>
</template>
<script lang="ts" setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as zod from 'zod';
import { sha256 } from 'js-sha256';

const router = useRouter()
const message = ref('')

// Validazione
const emailValidator = toTypedSchema(
  zod.string().email({ message: 'indirizzo non valido' })
);
const usernameValidator = toTypedSchema(
  zod.string().min(3, { message: 'Deve essere almeno 3 caratteri' })
);
const passwordValidator = toTypedSchema(
  zod.string().min(8, { message: 'Deve essere almeno 8 caratteri' })
);

async function onSubmit(values: any) {
  try {
    const response: any = await $fetch('/api/user/create', {
      method: 'POST',
      body: {
        email: values.email,
        username: values.username,
        password: sha256(values.password)
      }
    })
  } catch (response: any) {
    message.value = response.message

    return {
      statusCode: response.statusCode,
      message: response.message
    }
  }

  router.push('/')
}
</script>