<template>
  <div class="w-fit m-auto">
    <h3 class="text-center mb-2">{{ device.type }} {{ device.instance }}</h3>
    <p class="text-center text-xs">{{ device.name }}</p>
    <div>
      <button class="btn-1" @click="changeGrid(60, 60, 11, 5)">Change grid</button>
      <button data-modal-target="default-modal" data-modal-toggle="default-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">Config Grid</button>
    </div>
    <div :id="`container-${device.id}`">
      <canvas :id="`c-${device.id}`" class="border-dashed border-2"></canvas>
    </div>
    <div class="w-full">
      <FormsSaveCanvas :device="device" :canvas="canvas" :canvas_grid="gridObj" v-if="global_store.loggedIn" />
    </div>
  </div>

  <div id="default-modal" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Grid size
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <Form class="w-full flex gap-10" v-slot="{ values }" @submit="submitForm">
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          
            <div class="mb-5">
              <label class="input" for="cell-w">Cell width</label>
              <Field as="select" id="cell-w" name="cellW">
                <option value="" selected>{{ gridObj.cellW }}</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="180">180</option>
              </Field>
              <ErrorMessage name="cellW" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="cell-h">Cell height</label>
              <Field as="select" id="cell-h" name="cellH">
                <option value="" selected>{{ gridObj.cellH }}</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="180">180</option>
              </Field>
              <ErrorMessage name="cellH" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="grid-cols">Grid columns</label>
              <Field as="select" id="cell-cols" name="gridCols">
                <option value="" selected>{{ gridObj.gridCols }}</option>
                <option value="5">5</option>
                <option value="10">11</option>
                <option value="15">15</option>
                <option value="18">17</option>
                <option value="20">21</option>
              </Field>
              <ErrorMessage name="cellCols" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="grid-rows">Grid rows</label>
              <Field as="select" id="grid-rows" name="gridRows">
                <option value="" selected>{{ gridObj.gridRows }}</option>
                <option value="5">5</option>
                <option value="10">11</option>
                <option value="15">15</option>
                <option value="18">17</option>
                <option value="20">21</option>
              </Field>
              <ErrorMessage name="gridRows" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
          
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-hide="default-modal" type="submit" class="btn-green">Save</button>
          <button data-modal-hide="default-modal" type="button" class="btn-red">Cancel</button>
        </div>
      </Form>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import * as fabric from 'fabric';
import { Field, Form, ErrorMessage } from 'vee-validate';

const global_store: any = useGlobalStore()
const props = defineProps(['items', 'device'])
const canvas: any = ref({})
const canvas_grid = props.device.canvas_grid ? JSON.parse(props.device.canvas_grid) : {}

var gridObj = {
  cellH: canvas_grid.cellH || 60,
  cellW: canvas_grid.cellW || 60,
  gridCols: canvas_grid.gridCols || 11,
  gridRows: canvas_grid.gridRows || 11,
  gridW: () => {
    return gridObj.gridCols * gridObj.cellW
  },
  gridH: () => {
    return gridObj.gridRows * gridObj.cellH
  }
}

const changeGrid = function (ch: number, cw: number, gc: number, gr: number) {
  canvas.value.dispose()

  gridObj = {
    cellH: ch || 60,
    cellW: cw || 60,
    gridCols: gc || 11,
    gridRows: gr || 11,
    gridW: () => {
      return gridObj.gridCols * gridObj.cellW
    },
    gridH: () => {
      return gridObj.gridRows * gridObj.cellH
    }
  }

  initCanvas()
}

const submitForm = function (values: any) {
  changeGrid(values.cellH, values.cellW, values.gridCols, values.gridRows)
}

async function initCanvas() {
  var top_current: number = 0
  var left_current: number = 0

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
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: gridObj.gridW(), height: gridObj.gridH(), selection: false })
    await canvas.value.loadFromJSON(json)
    canvas.value.renderAll(canvas.value)
  } else {
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: gridObj.gridW(), height: gridObj.gridH(), selection: false })

    // create grid
    for (var i = 0; i < (602 / gridObj.cellH); i++) {
      canvas.value.add(new fabric.Line([i * gridObj.cellW, 0, i * gridObj.cellW, gridObj.gridH()], {
        stroke: '#ccc',
        selectable: false
      }));
      canvas.value.add(new fabric.Line([0, i * gridObj.cellH, gridObj.gridW(), i * gridObj.cellH], {
        stroke: '#ccc',
        selectable: false
      }))
    }

    // Filtra elementi per prefix
    const filtered = props.items.filter((item: any) => item.device == props.device.prefix)
    filtered.forEach((el: any) => {
      var cElements: Array<any> = []
      var tElements: Array<any> = []

      cElements.push(new fabric.Rect({
        width: gridObj.cellW,
        height: gridObj.cellH,
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
          top: 15 * i,
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
    if (Math.round(options.target.left / gridObj.cellW * 4) % 4 == 0 &&
      Math.round(options.target.top / gridObj.cellH * 4) % 4 == 0) {
      options.target.set({
        left: Math.round(options.target.left / gridObj.cellW) * gridObj.cellW,
        top: Math.round(options.target.top / gridObj.cellH) * gridObj.cellH
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