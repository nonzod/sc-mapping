<template>
  <div>
    <h2 class="font-bold">Device: {{ device }}</h2>

    <h3 class="font-semibold">Assi</h3>
    <ul class="">
      <JoyAction label="X" :action="button('x')" />
      <JoyAction label="Y" :action="button('y')" />
      <JoyAction label="Z" :action="button('z')" />
    </ul>

    <div class="flex mt-2">
      <div class="">
        <h3 class="font-semibold">HAT 1</h3>
        <ul class="">
          <JoyAction label="UP" :action="button('hat1 up')" />
          <JoyAction label="LEFT" :action="button('hat1 left')" />
          <JoyAction label="RIGHT" :action="button('hat1 right')" />
          <JoyAction label="DOWN" :action="button('hat1 down')" />
        </ul>
      </div>
      <div class="">
        <h3 class="font-semibold">ROT</h3>
        <ul class="">
          <JoyAction label="X" :action="button('rotx')" />
          <JoyAction label="Y" :action="button('roty')" />
          <JoyAction label="Z" :action="button('rotz')" />
        </ul>
      </div>
    </div>

    <div class="flex mt-2">
      <div class="w-1/2">
        <h3 class="font-semibold">FACE BUTTONS SX</h3>
        <ul v-for="n in 4">
          <JoyAction :label="`B${n}`" :action="button(`button${n}`)" />
        </ul>
      </div>
      <div class="w-1/2">
        <h3 class="font-semibold">FACE BUTTONS DX</h3>
        <ul v-for="n in 4">
          <JoyAction :label="`B${n}`" :action="button(`button${n+4}`)" />
        </ul>
      </div>
    </div>

    <div class="mt-2">
      <h3 class="font-semibold">Buttons</h3>
      <ul v-for="n in 15">
        <JoyAction :label="labels[n+8]" :action="button(`button${n+8}`)" />
      </ul>
    </div>
  </div>

</template>
<script setup lang="ts">
import type { ActionMapDbRow } from '~/server/utils/types';

const props = defineProps(['items', 'device'])
const labels: any = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: 'B9 <span class="text-xs">Top Detent Button</span>',
  10: 'B10 <span class="text-xs">Bottom Detent Button</span>',
  11: 'B11 <span class="text-xs">Top Detent Button</span>',
  12: 'B12 <span class="text-xs">Bottom Detent Button</span>',
  13: 'B13 <span class="text-xs">Roll Trim Wheel Up</span>',
  14: 'B14 <span class="text-xs">Roll Trim Wheel Down</span>',
  15: 'B15 <span class="text-xs">Click Trim Wheel Down</span>',
  16: 'B16 <span class="text-xs">Left Side Thumb Button</span>',
  17: 'B17 <span class="text-xs">Right Side Thumb Button</span>',
  18: 'B18 <span class="text-xs">Trigger</span>',
  19: 'B19 <span class="text-xs">H2 Click</span>',
  20: 'B20 <span class="text-xs">Guide Button</span>',
  21: 'B21 <span class="text-xs">View Button</span>',
  22: 'B22 <span class="text-xs">Share Button</span>',
  23: 'B23 <span class="text-xs">Menu Button</span>'
}
const button = function (name: string): string {
  const res = props.items.filter((item: any) => item.device == props.device && item.button == name)

  if (res != '') {
    var out: string = '<ul>'
    res.forEach((e: ActionMapDbRow) => {
      out += ` <li class="text-sm">${e.action} <span class="text-xs">(${e.section})</span></li>`
    });

    return out + "</ul>"
  }

  return 'none'
}
</script>