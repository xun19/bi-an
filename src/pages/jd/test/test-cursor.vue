<template>
    <div>speed: <span :style="{color}">{{cursorSpeed}}</span> / 100</div>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue'
import Cursor from '@/entity/Cursor'
import {Diabstracter} from '@/entity/Diabstracter'

const cursorSpeed = ref(0)
const color = computed(() => cursorSpeed.value > 100 ? 'red' : 'blue')

const cursor: any = new Cursor()
// cursor._bindMouseMoveEvent()
// cursor._computeMouseMoveSpeed()
cursor.subscribeComputingMouseSpeed((speed: number) => {
	cursorSpeed.value = Math.ceil(speed)
})

const diabstracter = new Diabstracter({
	HP: 0,
	HP_TOTAL: 0,
	ATK: 0,
	ATK_TOTAL: 0,
	DEF: 0,
	DEF_TOTAL: 0,

	coreCount: 0,
	coreTotal: 0,

	speed: 6,
	rotateSpeed: 4,
	response: 1,

	center: [50, 50],
	occupancyArea: {
		width: 100,
		height: 100,
	}
})

diabstracter._addPartsPolygon([0, 0, 0, 100, 100, 100, 100, 0])
diabstracter.startState()
</script>

<style>
</style>
