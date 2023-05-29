<template>
  <el-dialog
    ref="dialogue"
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
  >
    <span>{{msg}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessageBox, ElButton, ElDialog} from 'element-plus' // 必须引入ElDialog、ElButton

// const props = defineProps({ // 此方法不需要import
//   visible: {
//     type: Boolean,
//     default: false
//   }
// })
// const emit = defineEmits(['update:visible'])

// watch(() => props.visible, val => dialogVisible.value = val)

const dialogVisible = ref(false)
const title = ref('')
const msg = ref('')

const handleClose = (done: () => void) => {
	ElMessageBox.confirm('Are you sure to close this dialog?')
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}

defineExpose({
	title,
	msg,
	dialogVisible
})

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
