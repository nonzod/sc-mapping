<template>
  <div class="w-full">
    <div :id="`container-${device.id}`">
      <canvas :id="`c-${device.id}`" class="border-dashed border-2"></canvas>
    </div>
    <div class="w-full">
      <FormsSaveCanvas :device="device" :canvas="canvas" />
    </div>
  </div>
</template>
<script setup lang="ts">
import * as fabric from 'fabric';

const props = defineProps(['items', 'device'])
const canvas: any = ref({})

async function initCanvas() {
  var top_current: number = 0
  var left_current: number = 0
  var grid = 60, grid_size = 660

  /** abbozzo di ordinamento in colonna */
  const getTop = (): number => {
    if (left_current < (7 * 60)) {
      return top_current
    }

    return top_current += 60
  }

  const getLeft = (): number => {
    if (left_current < (7 * 60)) {
      return left_current += 60
    }

    return left_current = 0
  }

  if (props.device.canvas && props.device.canvas != '{}') {
    const json = JSON.parse(props.device.canvas)
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: grid_size, height: grid_size, selection: false })
    await canvas.value.loadFromJSON(json)
    canvas.value.renderAll(canvas.value)
  } else {
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: grid_size, height: grid_size, selection: false })

    // create grid
    for (var i = 0; i < (602 / grid); i++) {
      canvas.value.add(new fabric.Line([i * grid, 0, i * grid, grid_size], {
        stroke: '#ccc',
        selectable: false
      }));
      canvas.value.add(new fabric.Line([0, i * grid, grid_size, i * grid], {
        stroke: '#ccc',
        selectable: false
      }))
    }

    // Filtra elementi per prefix
    const filtered = props.items.filter((item: any) => item.device == props.device.prefix)
    filtered.forEach((el: any) => {
      const r = new fabric.Rect({
        width: 60,
        height: 60,
        fill: props.device.prefix == 'js1' ? 'red' : 'green'
      })

      const t = new fabric.Textbox(el.button, {
        fontFamily: 'Roboto',
        fontSize: 10,
        width: 60,
        height: 60,
        textAlign: 'center',
        top: 10
      })

      const g = new fabric.Group([r, t], {
        top: getTop(),
        left: getLeft(),
        hasControls: false,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true
      });

      canvas.value.add(g)
    })
  }

  // Snap alla finta griglia
  canvas.value.on('object:moving', function (options) {
    if (Math.round(options.target.left / grid * 4) % 4 == 0 &&
      Math.round(options.target.top / grid * 4) % 4 == 0) {
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      }).setCoords();
    }
  })
}



onMounted(() => {
  initCanvas()
})

type Button = {
  name: string,
  actions?: string[],
  section: string
}
</script>