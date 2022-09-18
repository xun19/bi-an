<template>
    <EasyRing
        :open="isOpen"
        :ring="itemRing"
        :src="itemAudioSrc"
        :loop="false"
        @ended="resetItemRing"
    />
	<EasyRing
        :open="isOpen"
        :ring="clickRing"
        :src="clickAudioSrc"
        :loop="false"
        @ended="resetClickRing"
    />
</template>
<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import EasyRing from './Xring.vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import useSystemAudioStore from '@/state/system/audio'

import itemAudioSrc from '@/assets/audio/system.mp3'
import clickAudioSrc from '@/assets/audio/click2.mp3'

const systemAudioStore = useSystemAudioStore()

const isOpen = computed(() => systemAudioStore.isOpen)
const itemRing = computed(() => systemAudioStore.itemRing)
const clickRing = computed(() => systemAudioStore.clickRing)

const resetItemRing = () => {
	systemAudioStore.setItemRing(false)
}

const resetClickRing = () => {
	systemAudioStore.setClickRing(false)
}

onMounted(() => {
	ElMessageBox.confirm(
		'请求开启音效，是否同意？',
		'',
		{
			confirmButtonText: '同意',
			cancelButtonText: '拒绝',
			type: 'warning'
		}
	)
		.then(() => {
			systemAudioStore.open()
			// eslint-disable-next-line new-cap
			ElMessage({
				type: 'success',
				message: '已开启音效'
			})
		})
		.catch(() => {
			// eslint-disable-next-line new-cap
			ElMessage({
				type: 'info',
				message: '已拒绝开启音效'
			})
		})
})
</script>

<style>
</style>
