<script setup lang="ts">
import {ref} from 'vue'
import {ElButton} from 'element-plus'
import showDialog from '../utils/dialog'
import ItemsBox from '../components/common/ItemsBox.vue'

// Console.log(typeof showDialog)
showDialog({
	// Title: '',
	msg: 'hello' // Msg 改成content
})

const showToolBox = ref(false)
</script>

<template>
  <ElButton @click="showToolBox = true">show</ElButton>
  <ItemsBox v-model:show="showToolBox"></ItemsBox>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
