<template>
  <div class="w-full">
    <h3 class="text-center mb-2">{{ device.prefix }}</h3>
    <p class="text-center text-xs">{{ device.name }}</p>
    <div :id="`container-${device.id}`">
      <canvas :id="`c-${device.id}`" class="border-dashed border-2"></canvas>
    </div>
    <div class="w-full">
      <FormsSaveCanvas :device="device" :canvas="canvas" v-if="global_store.loggedIn"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as fabric from 'fabric';
const global_store: any = useGlobalStore()
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
      var cElements:Array<any> = []
      var tElements:Array<any> = []

      cElements.push(new fabric.Rect({
        width: 60,
        height: 60,
        fill: 'rgb(15,44,62)'
      }))

      const top = getTop()
      const left = getLeft()

      // Testo bottone
      cElements.push(new fabric.Textbox(el.button, {
        fontFamily: 'Roboto',
        fontSize: 12,
        fill: 'rgb(168,179,189)',
        width: 60,
        lineHeight: 2,
        textAlign: 'center',
        top: 0,
        left: 0,
        backgroundColor: 'rgb(6,74,124)'
      }))

      // Lista action nel button @todo da rifare
      var i = 1
      el.action.split(',').forEach((action: string) => {
        tElements.push(new fabric.Textbox(action.replace('v_', ''), {
          fontFamily: 'Roboto',
          fontSize: 12,
          textAlign: 'left',
          top: 15*i,
          left: 0,
          backgroundColor: 'rgb(178,204,255)'
        }))
        i++
      })

      // Gruppo con le actions
      cElements.push(new fabric.Group(tElements, {
        top: 20,
        left: 5,
        width: 60,
        height: 60,
        hasControls: false,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true
      }))

      const g = new fabric.Group(cElements, {
        top: top,
        left: left,
        width: 60,
        height: 60,
        hasControls: false,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true
      });

      canvas.value.add(g)
    })
  }

  // Snap alla finta griglia
  canvas.value.on('object:moving', function (options: any) {
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