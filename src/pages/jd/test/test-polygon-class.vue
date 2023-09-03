<template>
  <!-- <p style="position:absolute;font-size: 20px;">hp: <span style="color:red;font-weight:boid;">{{ hp }}</span></p> -->
  <svg id="SvgContainer" width="100" height="100" style="position:absolute">
    <defs>
      <linearGradient id="Gradient1">
        <stop class="stop1" offset="0%" />
        <stop class="stop2" offset="50%" />
        <stop class="stop3" offset="100%" />
      </linearGradient>
      <linearGradient id="Gradient2" x1="1" x2="0" y1="0" y2="0">
        <stop offset="0%" stop-color="red" />
        <stop offset="50%" stop-color="black" stop-opacity="0" />
        <stop offset="100%" stop-color="blue" />
      </linearGradient>
      <!-- <style type="text/css">
        <![CDATA[
                #rect1 { fill: url(#Gradient1); }
                .stop1 { stop-color: red; }
                .stop2 { stop-color: black; stop-opacity: 0; }
                .stop3 { stop-color: blue; }
              ]]>
      </style> -->
    </defs>
  </svg>
</template>
<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'
import {ExtendedPolygon} from '@/entity/Polygon'

const hp = ref(30)

onMounted(() => {
	// const polygon = new ExtendedPolygon({
	// 	points: [[0, 0], [100, 0], [100, 100], [0, 100]],
	// 	svgContainer: 'SvgContainer'
	// })

	// const flag = setInterval(() => {
	// 	if (hp.value <= 0) {
	// 		// eslint-disable-next-line no-alert
	// 		alert('YOU DEAD')
	// 		clearInterval(flag)
	// 		return
	// 	}

	// 	polygon.rotate(45)
	// 	polygon.move2fb(300)
	// 	polygon.rotate(45)
	// 	polygon.move2fb(300)
	// 	polygon.move2fb(-300)
	// 	polygon.rotate(-90)
	// 	polygon.move2fb(300)
	// 	polygon.move2lr(300)
	// 	polygon.move2lr(-300)
	// }, 1000)

	// setTimeout(() => {
	// 	polygon.rotate(45)
	// }, 1000)
	// setTimeout(() => {
	// 	polygon.move2fb(100)
	// }, 2000)
	// setTimeout(() => {
	// 	polygon.rotate(45)
	// }, 3000)
	// setTimeout(() => {
	// 	polygon.move2fb(100)
	// }, 4000)
	// setTimeout(() => {
	// 	polygon.move2lr(-100)
	// }, 5000)

	// 前为正，右为正

	setInterval(() => {
		if (polygon.checkMouseCollision()) {
			hp.value -= 1
		}
	}, 100)
})

</script>

<style>
</style>
