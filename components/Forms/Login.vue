<template>
  <h2 class="mb-5">Login</h2>
  <Form class="lg:w-1/2 sm:w-full" v-slot="{ values }" :validation-schema="validation_schema" @submit="onSubmit">
    <div class="mb-5">
      <label class="input" for="username">Username</label>
      <Field type="text" id="username" name="username" />
      <ErrorMessage name="username" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <label class="input" for="password">Password</label>
      <Field type="password" id="password" name="password" />
      <ErrorMessage name="password" class="mt-2 text-sm text-red-600 dark:text-red-500" />
    </div>
    <div class="mb-5">
      <span class="alert danger">{{ message }}</span>
    </div>
    

    <button type="submit" class="btn-1">Entra!</button>

  </Form>
</template>
<script lang="ts" setup>
const router = useRouter()
const { gtag } = useGtag()

const message = ref('')

// SSR-ready
gtag('event', 'screen_view', {
  app_name: 'sc-mapping',
  screen_name: 'Login'
})

// Validazione
const validation_schema = {
  username: (value: string) => {
    if (value)
      return true

    return 'Indica il tuo username'
  },
  password: (value: string) => {
    if (value)
      return true

    return "Indica la tua password"
  }
};

async function onSubmit(values: any) {
  try {
  const response: any = await $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      username: values.username,
      password: values.password
    }
  })
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