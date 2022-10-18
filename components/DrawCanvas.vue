<template>
  <div class="canvasContainer">
    <canvas :id="id" class="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '#imports'
import DrawableCanvas from '~/assets/javascript/DrawableCanvas'

export default defineComponent({
  props: {
    id: String,
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 600,
    },
  },
  setup(props) {
    const canvasElement = ref(null)

    const undo = () => {
      canvasElement?.value.undo()
    }
    const redo = () => {
      canvasElement?.value.redo()
    }
    const deleteAll = () => {
      canvasElement?.value.deleteAll()
    }
    const setBrushWidth = (width: number) => {
      console.log('setBrushWidth', width)
      canvasElement?.value.setBrushWidth(width)
    }
    const setStrokeColor = (color: string) => {
      canvasElement?.value.setStrokeColor(color)
    }
    const setDrawingMode = (flag: boolean) => {
      canvasElement.value.drawingMode = flag
    }
    const setStampImage = (imagePath: string) => {
      console.log(imagePath)
      canvasElement?.value.setStampImage(imagePath)
    }
    const saveImage = () => {
      canvasElement?.value.saveImage()
    }

    onMounted(() => {
      canvasElement.value = new DrawableCanvas(props.id)
    })

    return {
      undo,
      redo,
      deleteAll,
      setBrushWidth,
      setStrokeColor,
      setDrawingMode,
      setStampImage,
      saveImage,
    }
  },
})
</script>

<style lang="scss" scoped>
.canvasContainer {
  width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
}
.canvas {
  border: solid #494949 1px;
  max-width: 600px;
}
</style>
