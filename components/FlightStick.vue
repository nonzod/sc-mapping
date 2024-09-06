<template>
  <h2>Joystick 1</h2>

  <ul class="">
    <li>{{ button('js1', 'hat1 up') }}</li>
    <li>{{ button('js1', 'hat1 left') }}</li>
    <li>{{ button('js1', 'hat1 right') }}</li>
    <li>{{ button('js1', 'hat1 down') }}</li>
  </ul>

  <div class="flex">
    <ul class="flex-grow">
      <li>{{ button('js1', 'button1') }}</li>
      <li>{{ button('js1', 'button2') }}</li>
      <li>{{ button('js1', 'button3') }}</li>
      <li>{{ button('js1', 'button4') }}</li>
    </ul>
    <ul class="flex-grow">
      <li>{{ button('js1', 'button5') }}</li>
      <li>{{ button('js1', 'button6') }}</li>
      <li>{{ button('js1', 'button7') }}</li>
      <li>{{ button('js1', 'button8') }}</li>
    </ul>
  </div>
  <h2>Joystick 2</h2>
  <div class="flex">
    <ul class="flex-grow">
      <li>{{ button('js2', 'button1') }}</li>
      <li>{{ button('js2', 'button2') }}</li>
      <li>{{ button('js2', 'button3') }}</li>
      <li>{{ button('js2', 'button4') }}</li>
    </ul>
    <ul class="flex-grow">
      <li>{{ button('js2', 'button5') }}</li>
      <li>{{ button('js2', 'button6') }}</li>
      <li>{{ button('js2', 'button7') }}</li>
      <li>{{ button('js2', 'button8') }}</li>
    </ul>
  </div>

  <pre>
    {{ items }}
  </pre>
</template>
<script setup lang="ts">
import type { ActionMapDbRow } from '~/server/utils/types';

const props = defineProps(['items'])

const button = function (device: string, name: string): string {
  const res = props.items.filter((item: any) => item.device == device && item.button == name)

  if (res != '') {
    var out: string = ''
    res.forEach((e: ActionMapDbRow) => {
      out += `${e.button} - ${e.action} (${e.section})`
    });

    return out
  }

  return 'none'
}
</script>