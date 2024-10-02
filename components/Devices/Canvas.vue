<template>
  <div class="w-fit m-auto">
    <h3 class="text-center mb-2">{{ device.type }} {{ device.instance }}</h3>
    <p class="text-center text-xs">{{ device.name }}</p>
    <div>
      <button :data-modal-target="modal_id" :data-modal-show="modal_id" class="flex gap-2 text-yellow-400"
        type="button">
        <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="#723B13" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
          <path stroke="#723B13" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
        <p class="text-yellow-400">settings</p>
      </button>

    </div>
    <!-- Canvas -->
    <div :id="`container-${device.id}`">
      <canvas :id="`c-${device.id}`" class="border-dashed border-2"></canvas>
    </div>
    <!-- Form Save Canvas -->
    <div class="w-full">
      <FormsSaveCanvas :device="device" :canvas="canvas" :canvas_grid="gridObj" v-if="canSave()" />
    </div>
  </div>
  <!-- Grid Settings Modal -->
  <div :id="modal_id" tabindex="-1" aria-hidden="true"
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
            :data-modal-hide="modal_id">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <Form class="w-full flex gap-10" id="form-grid-settings" v-slot="{ values }" @submit="submitForm">
            <div class="mb-5">
              <label class="input" for="cell-w">Cell width</label>
              <Field as="select" id="cell-w" name="cellW" v-model="gridObj.cellW">
                <option :value="opt" v-for="opt in canvas_grid_opts.cellW">{{ opt }}</option>
              </Field>
              <ErrorMessage name="cellW" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="cell-h">Cell height</label>
              <Field as="select" id="cell-h" name="cellH" v-model="gridObj.cellH">
                <option :value="opt" v-for="opt in canvas_grid_opts.cellH">{{ opt }}</option>
              </Field>
              <ErrorMessage name="cellH" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="grid-cols">Grid columns</label>
              <Field as="select" id="cell-cols" name="gridCols" v-model="gridObj.gridCols">
                <option :value="opt" v-for="opt in canvas_grid_opts.gridCols">{{ opt }}</option>
              </Field>
              <ErrorMessage name="cellCols" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
            <div class="mb-5">
              <label class="input" for="grid-rows">Grid rows</label>
              <Field as="select" id="grid-rows" name="gridRows" v-model="gridObj.gridRows">
                <option :value="opt" v-for="opt in canvas_grid_opts.gridRows">{{ opt }}</option>
              </Field>
              <ErrorMessage name="gridRows" class="mt-2 text-sm text-red-600 dark:text-red-500" />
            </div>
          </Form>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button :data-modal-hide="modal_id" type="submit" form="form-grid-settings" class="btn-green">Save</button>
          <button :data-modal-hide="modal_id" type="button" class="btn-red">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import * as fabric from 'fabric';
import { Field, Form, ErrorMessage } from 'vee-validate';

const props = defineProps(['items', 'device', 'user_id'])
const canvas: any = ref({})
const modal_id = `grid-settings-modal-${props.device.id}`
const canvas_grid = props.device.canvas_grid ? JSON.parse(props.device.canvas_grid) : {}
const canvas_grid_opts = {
  cellH: [30, 60, 90, 120],
  cellW: [30, 60, 90, 120],
  gridCols: [3, 6, 9, 12],
  gridRows: [3, 6, 9, 12]
}

const gridObj = ref({
  cellH: canvas_grid.cellH || 60,
  cellW: canvas_grid.cellW || 90,
  gridCols: canvas_grid.gridCols || 9,
  gridRows: canvas_grid.gridRows || 9,
  gridW: () => {
    return gridObj.value.gridCols * gridObj.value.cellW
  },
  gridH: () => {
    return gridObj.value.gridRows * gridObj.value.cellH
  }
})

const changeGrid = function (ch: number, cw: number, gc: number, gr: number) {
  canvas.value.dispose()
  canvas.value = null

  gridObj.value = {
    cellH: ch,
    cellW: cw,
    gridCols: gc,
    gridRows: gr,
    gridW: () => {
      return gridObj.value.gridCols * gridObj.value.cellW
    },
    gridH: () => {
      return gridObj.value.gridRows * gridObj.value.cellH
    }
  }

  initCanvas(true)
}

const submitForm = function (values: any) {
  changeGrid(values.cellH, values.cellW, values.gridCols, values.gridRows)
}

const canSave = function () {
  const global_store: any = useGlobalStore()
  console.log(global_store.value.loggedIn)
  if (global_store.value.loggedIn) {
    if (global_store.value.user.id == props.user_id) {
      return true
    }
  }

  return false
}

async function initCanvas(noCache: boolean = false) {
  var top_current: number = 0
  var left_current: number = 0

  /** abbozzo di ordinamento in colonna */
  const getTop = (): number => {
    if (left_current < (7 * gridObj.value.cellW)) {
      return top_current
    }

    return top_current += gridObj.value.cellH
  }

  const getLeft = (): number => {
    if (left_current < (7 * gridObj.value.cellW)) {
      return left_current += gridObj.value.cellW
    }

    return left_current = 0
  }

  if (props.device.canvas && props.device.canvas != '{}' && !noCache) {
    const json = JSON.parse(props.device.canvas)
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: gridObj.value.gridW(), height: gridObj.value.gridH(), selection: false })
    await canvas.value.loadFromJSON(json)
    canvas.value.renderAll(canvas.value)
  } else {
    canvas.value = new fabric.Canvas(`c-${props.device.id}`, { width: gridObj.value.gridW(), height: gridObj.value.gridH(), selection: false })

    // create grid
    for (var i = 0; i < (gridObj.value.gridW() / gridObj.value.cellW); i++) {
      canvas.value.add(new fabric.Line([i * gridObj.value.cellW, 0, i * gridObj.value.cellW, gridObj.value.gridH()], {
        stroke: '#cacaca',
        selectable: false
      }))
    }
    for (var i = 0; i < (gridObj.value.gridH() / gridObj.value.cellH); i++) {
      canvas.value.add(new fabric.Line([0, i * gridObj.value.cellH, gridObj.value.gridW(), i * gridObj.value.cellH], {
        stroke: '#cacaca',
        selectable: false
      }))
    }

    // Filtra elementi per prefix
    const filtered = props.items.filter((item: any) => item.device == props.device.prefix)
    filtered.forEach((el: any) => {
      var cElements: Array<any> = []
      var tElements: Array<any> = []

      cElements.push(new fabric.Rect({
        width: gridObj.value.cellW,
        height: gridObj.value.cellH,
        fill: '#082f49',
        rx: 10,
        ry: 10,
        hasBorders: false
      }))

      const top = getTop()
      const left = getLeft()
      // Testo bottone
      cElements.push(new fabric.Textbox(el.button, {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 'bold',
        fill: buttonColor(el.button, el.device),
        width: gridObj.value.cellW - 20,
        lineHeight: 2,
        textAlign: 'center',
        top: 0,
        left: 10,
        backgroundColor: '#0f172a',
        hasBorders: false
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
        width: gridObj.value.cellW,
        height: gridObj.value.cellH,
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
    if (Math.round(options.target.left / gridObj.value.cellW * 4) % 4 == 0 &&
      Math.round(options.target.top / gridObj.value.cellH * 4) % 4 == 0) {
      options.target.set({
        left: Math.round(options.target.left / gridObj.value.cellW) * gridObj.value.cellW,
        top: Math.round(options.target.top / gridObj.value.cellH) * gridObj.value.cellH
      }).setCoords();
    }
  })
}

onMounted(() => {
  initCanvas()

  useFlowbite(() => {
    initModals();
  })
})

type Button = {
  name: string,
  actions?: string[],
  section: string
}

// @todo questa cosa è da fare decentemente
function buttonColor(button: string, type: string): string {
  if (type.startsWith('js')) {
    if (button.startsWith('button')) {
      return '#F98080'
    } else if (button.startsWith('hat')) {
      return '#FDF6B2'
    } else if (button.startsWith('rot')) {
      return '#a8a29e'
    } else if (button.startsWith('slider')) {
      return '#31C48D'
    } else if (button.startsWith('rctrl')) {
      return '#31C48D'
    } else {
      return '#a78bfa'
    }
  } else if (type.startsWith('gp')) {
    if (button.startsWith('shoulderl')) {
      return '#F98080'
    } else if (button.startsWith('shoulderr')) {
      return '#FF8A4C'
    } else if (button.startsWith('triggerr')) {
      return '#FDF6B2'
    } else if (button.startsWith('triggerl')) {
      return '#ecfccb'
    } else if (button.startsWith('thumbr')) {
      return '#3f6212'
    } else {
      return '#a78bfa'
    }
  } else {
    if (button.startsWith('rctrl')) {
      return '#F98080'
    } else if (button.startsWith('ralt')) {
      return '#FDF6B2'
    } else {
      return '#a78bfa'
    }
  }
}
</script>