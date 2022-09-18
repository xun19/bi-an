<template>
    <el-dialog
        v-model="show"
        :title="title"
        width="30%"
  >
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            :height="400"
            :row-style="{height: '20px'}"
        >
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
import {ElDialog} from 'element-plus'

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(['update:show'])

const title = ref('tool')

watch(() => props.show, val => {
	emits('update:show', val)
})

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	}
]

</script>
