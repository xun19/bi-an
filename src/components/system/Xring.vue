<template>
    <div>
        <audio :id="`easyRing${id}`" :src="src" @ended="endHandle"></audio>
    </div>
</template>

<script lang="ts" setup>
import {ref, watch, onMounted} from 'vue'

let audioObject: any
const props = defineProps({
	ring: {
		type: Boolean,
		default: false
	},
	src: {
		type: String,
		default: ''
	},
	open: {
		type: Boolean,
		default: false
	},
    loop: {
        type: Boolean,
		default: true
    }
	// 音量
	// 静音
	// 播放速度
})
const emits = defineEmits(['update:ring', 'ended'])

const id = ref(parseInt((Math.random() * 1000000).toString()))
const active = ref(false)
watch(() => props.open, val => {
	if (val) {
		openRing()
	} else {
		stopRing()
	}
})
watch(() => props.ring, val => {
	if (val) {
		play()
	} else {
		pause()
	}
})

const openRing = () => {
	console.log('easy-ring:open')
	active.value = true
	audioObject.loop = false
	audioObject.pause() // 用于开启用户主动播放
}

const stopRing = () => {
	active.value = false
	audioObject.pause()
	audioObject.currentTime = 0
}

const play = () => {
	console.log('easy-ring:play')
	if (!audioObject.loop && props.loop) {
		audioObject.loop = true
	}

	if (active.value) {
		audioObject.currentTime = 0
		audioObject.play()
	}
}

const pause = () => {
	console.log('easy-ring:pause')
	audioObject.pause()
}

const endHandle = () => {
    console.log('easy-ring:end')
    if (!props.loop) {
        emits('update:ring', false)
    }
	emits('ended')
}

onMounted(() => {
    audioObject = document.getElementById(`easyRing${id.value}`)
	console.log('easy-ring:mounted')
})
</script>
