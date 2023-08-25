<template>
    <div :class="cursorClassName" style="height: 100%; width: 100%;" @mousemove="getCursorPosistion">
        <slot/>
    </div>
    <img :src="defaultCursorSvg" v-if="cursorClassName  == 'cursor-none'" :style="svgStyle">
</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue'
import defaultCursorSvg from '@/assets/cursor/default-cursor.svg'

const cursorClassName = ref('cursor-default')
const svgStyle = reactive<any>({
	position: 'absolute',
	left: '0px`',
	top: '0px'
})

const getCursorPosistion = (e:any) => {
	// console.log(e.screenX, e.screenY)
	if (e.screenX <= 268) {
		svgStyle.position = 'absolute'
		svgStyle.left = '268px'
		svgStyle.top = `${e.clientY}px`
		cursorClassName.value = 'cursor-none'
	} else {
		cursorClassName.value = 'cursor-default'
	}
}
</script>

<style lang="less" scoped>
.cursor-none {
    cursor: none;
}
</style>
