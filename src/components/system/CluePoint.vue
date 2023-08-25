<template>
    <div class="clue-point-container cursor-search " @click="emitGetClues">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import {PropType} from 'vue'
import {ElMessage} from 'element-plus'

const props = defineProps({
	ids: {
		type: Array as PropType<number[]>
	}
})
const emits = defineEmits(['getclues'])
const emitGetClues = () => {
	ElMessage.success('收集到一条线索!')
	emits('getclues', {
		ids: props.ids
	})
	// TODO: 写入store
}
</script>
