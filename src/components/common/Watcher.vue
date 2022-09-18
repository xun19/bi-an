<template>
    <div v-if="state.visible">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'

const state = reactive({
	visible: true, // 可删除
	faceRecognition: true, // 可脸部扫描
	fingerprintRecognition: true, // 可放大细节 搜索指纹
	search: true, // 可搜查
	message: true, // 可获得消息
	warn: true, // 警告
	watch: true, // 监视
	listening: true, // 窃听【对于有音效的元素、或者女主的音频/视频（如果能做。。），切换为窃听会能够解析到隐秘信息】
	star: true, // 星星解析
	boom: true, // 引爆 （？）不如把剪刀换成炸弹，变成删除？
	lock: true, // 隐藏信息
	unlock: true, // 隐藏信息已解锁
	injection: true, // 注毒
	rescue: true, // 救助
	position: true // 定位
})

/*
    指针动作分为两种: 一种主动（切换）型【暗示】 一种算是被动辅助型（表示该元素的一些可进行的操作【明示】）
    主动型：调查、狙击、监视（？）、窃听（？）、人脸、指纹、星、定位、【QW 快捷键切换】
    被动型：消息、隐藏信息/隐藏信息已解锁（需要解密）、警告
    风险型：删除（炸弹）、注毒、救助、移动

    若是主动型，则state里的属性值为true表示它能被这项动作触发
    若是被动型，则state里的属性值为true表示鼠标移到上面会自动变为相应的暗示图标 【所以一个元素只有一个被动型，互相不兼容】
*/

</script>
