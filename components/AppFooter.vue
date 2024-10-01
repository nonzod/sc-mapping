<template>
  <footer>
    <div class="text-sm text-gray-500 dark:text-gray-400">
      <p>© 2024 <a href="https://nicolatomassoni.it/" target="_blank"
          class="hover:underline">Nicola Tomassoni</a>. <a href="https://creativecommons.org/licenses/by/3.0/it/legalcode.it" target="_blank" class="hover:underline">CC BY 3.0 IT</a></p>
      <p class="leading-loose text-xs font-semibold text-gray-900 underline dark:text-white decoration-indigo-500">This is a project in development, on may break down and not work but hopefully not...</p>
      <p class="text-sm"><strong>Star Citizen®, Roberts Space Industries® and Cloud Imperium®</strong> are registered trademarks
        of Cloud Imperium Rights LLC</p>
        <p v-html="privacy_text"></p>
    </div>
    <img class="w-40 h-40 rounded-full" src="/imgs/MadeByTheCommunity_White-160x160.webp" alt="Rounded avatar" height="100%">
  </footer>
</template>
<script setup lang="ts">
  const privacy_text = `<a href="${process.env.LINK_PRIVACY_POLICY}" target="_blank">privacy policy</a> | <a href="${process.env.LINK_COOKIE_POLICY}" target="_blank">cookie policy</a>`
</script>