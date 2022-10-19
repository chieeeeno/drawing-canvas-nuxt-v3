<template>
  <div class="pageContainer">
    <DrawCanvas :id="'canvas'" ref="drawCanvas" :width="600" :height="600" />
    <div class="toolContainer">
      <div class="tool">
        <div class="buttonContainer">
          <div class="buttonInner">
            <Tooltip>
              <template #title>戻る</template>
              <Button type="default" @click="undo">
                <UndoOutlined />
              </Button>
            </Tooltip>

            <Tooltip>
              <template #title>進む</template>
              <Button type="default" @click="redo">
                <RedoOutlined />
              </Button>
            </Tooltip>
            <Tooltip>
              <template #title>線を書く</template>
              <Button
                :type="isDrawingMode ? 'primary' : 'default'"
                @click="toggleDrawingMode"
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip>
              <template #title>スタンプ</template>
              <Button
                :type="isStampMode ? 'primary' : 'default'"
                @click="toggleStampMode"
              >
                <PictureOutlined />
              </Button>
            </Tooltip>
            <Tooltip>
              <template #title>ダウンロードする</template>
              <Button type="primary" @click="saveImage"
                >Download <DownloadOutlined
              /></Button>
            </Tooltip>
          </div>
          <Tooltip>
            <template #title>リセットする</template>
            <Button type="danger" @click="deleteAll">
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      </div>

      <transition name="tools">
        <div v-show="isDrawingMode">
          <div class="tool">
            <p class="toolLabel">線の太さ</p>
            <Slider id="test" v-model="brushWidth" :min="1" :max="20" />
          </div>
          <div class="tool">
            <p class="toolLabel">線の色</p>
            <client-only>
              <!--              <compact-picker v-model="strokeColor" />-->
            </client-only>
          </div>
        </div>
      </transition>
      <transition name="tools">
        <div v-show="isStampMode">
          <div class="tool">
            <stamp-select @selectImage="setStampImage" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  UndoOutlined,
  RedoOutlined,
  EditOutlined,
  PictureOutlined,
  DownloadOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { Button, Slider, Tooltip } from 'ant-design-vue'
// import { Compact } from 'vue-color'
import DrawCanvas from '~/components/DrawCanvas'
import StampSelect from '~/components/StampSelect'
import { ref } from '#imports'

const brushWidth = ref(1)
const isStampMode = ref(true)
const isDrawingMode = ref(false)
const strokeColor = ref('red')

const drawCanvas = ref(null)

const TITLE = 'お絵かきアプリ'
useHead({
  title: TITLE,
  meta: [
    {
      name: 'description',
      content: 'お絵かきアプリのサンプル'
    }
  ]
})

watch(brushWidth, (width) => {
  setBrushWidth(width)
})
watch(strokeColor, (color) => {
  //@ts-ignore
  setStrokeColor(color.hex)
})
watch(isDrawingMode, (state) => {
  if (state) {
    isStampMode.value = false
  }
  drawCanvas?.value.setDrawingMode(state)
})

const undo = () => {
  drawCanvas?.value.undo()
}
const redo = () => {
  drawCanvas?.value.redo()
}
const saveImage = () => {
  drawCanvas?.value.saveImage()
}
const deleteAll = () => {
  drawCanvas?.value.deleteAll()
}
const setBrushWidth = (width: number) => {
  drawCanvas?.value.setBrushWidth(width)
}
const setStrokeColor = (color: string) => {
  drawCanvas?.value.setStrokeColor(color)
}
const setStampImage = (imagePath: string) => {
  console.log(drawCanvas.value)
  drawCanvas?.value.setStampImage(imagePath)
}
const toggleDrawingMode = () => {
  isDrawingMode.value = !isDrawingMode.value
  isStampMode.value = false
}
const toggleStampMode = () => {
  isDrawingMode.value = false
  isStampMode.value = !isStampMode.value
}
</script>

<style lang="scss" scoped>
.pageContainer {
  margin: 0 auto;
  min-height: 100vh;
  width: 600px;
}

.toolContainer {
  margin-top: 50px;
  .tool {
    margin-top: 10px;
    .toolLabel {
      margin-bottom: 10px;
    }
  }
}

.buttonContainer {
  display: flex;
  justify-content: space-between;
  .buttonInner {
    display: flex;
    gap: 8px;
  }
}

.tools-enter-active,
.tools-leave-active {
  transition: opacity 0.5s;
}
.tools-enter,
.tools-leave-to {
  opacity: 0;
}
</style>
