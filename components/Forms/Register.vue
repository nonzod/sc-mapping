<template>
  <h2 class="mb-5">Registration</h2>
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

    <NuxtTurnstile class="mb-5" v-model="token" :options="{ action: 'register' }" v-if="is_production"/>

    <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
    </div>

    <button type="submit" class="btn-1">Sign-In!</button>
  </Form>
</template>
<script lang="ts" setup>
import * as zod from 'zod';
import { sha256 } from 'js-sha256';
import { Field, Form, ErrorMessage } from 'vee-validate';

const message = ref('')
const token = ref('')
const is_production = process.env.NODE_ENV === 'production' //@todo, spostare come globale

// Validazione
const usernameValidator = toTypedSchema(
  zod.string().min(3, { message: 'It must be at least 3 characters' })
);
const passwordValidator = toTypedSchema(
  zod.string().min(8, { message: 'It must be at least 8 characters' })
);
const emailValidator = toTypedSchema(
  zod.string().email()
)

// Action
async function onSubmit(values: any) {
  try {
    const response: any = await $fetch('/api/user/register', {
      method: 'POST',
      body: {
        username: values.username,
        password: sha256(values.password),
        email: values.email,
        token: token.value
      }
    })

  } catch (response: any) {
    message.value = response.statusMessage

    return {
      statusCode: response.statusCode,
      message: response.message
    }
  }

  message.value = "Please check your inbox and confirm your E-Mail address"
}
</script>