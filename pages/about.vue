<template>
  <div class="p-6 space-y-6">
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      Questo tool esiste perché volevo studiarmi NuxtJs e perché mi piace Star Citizen.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      Star Citizen®, Roberts Space Industries® and Cloud Imperium ® are registered trademarks of Cloud Imperium Rights LLC
    </p>
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>
<script setup lang="ts">
import { Canvas, Rect } from 'fabric'; // browser

//const c = new Canvas('canvas')
const r = new Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: 'red',
  })

</script>