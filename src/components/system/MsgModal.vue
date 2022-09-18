<template>
    <!-- custom-class 已被 废弃，将于版本2.3.0时移除，请使用class。（暂时貌似还用不了？） -->
    <el-dialog
        custom-class="msg-modal"
        v-model="visible"
        :width="800"
        :show-close="false"
        @close="close"
    >
        <div class="msg-modal-content">
            <el-tabs type="border-card" @tabChange="ringItemAudio">
                <el-tab-pane label="收信箱">
                    <el-table
                        :data="recerveMsgList"
                        style="width: 100%"
                        :cell-style="{background: '#3052a8', color: 'white', cursor: 'pointer'}"
                        @row-click="clickHandle"
                    >
                        <el-table-column prop="title" label="标题" width="180" />
                        <el-table-column prop="author" label="发送者" width="180" />
                        <el-table-column prop="date" label="时间" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="发信箱">
                    <el-table
                        :data="sendMsgList"
                        style="width: 100%"
                        :cell-style="{background: '#3052a8', color: 'white'}"
                    >
                        <el-table-column prop="title" label="标题" width="180" />
                        <el-table-column prop="author" label="发送者" width="180" />
                        <el-table-column prop="date" label="时间" />
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
    <el-drawer
        custom-class="msg-modal-drawer"
        v-model="drawer"
        :title="`【${currentMsg.title}】`"
        direction="rtl"
    >
        <div>{{currentMsg.content}}</div>
        <div class="msg-drawer-bottom">
            <div>发送人：{{currentMsg.author}}</div>
            <div>时间：{{currentMsg.date}}</div>
        </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue'
// import type {SystemMsg} from '@/types/system/message'
import {SystemMsgType} from '@/types/system/message'
import useSystemMsgStore from '@/state/system/msg'
import useSystemAudioStore from '@/state/system/audio'

defineProps({
	visible: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(['update:visible'])

const close = () => {
	emits('update:visible', false)
}

const drawer = ref(false)

const systemMsgStore = useSystemMsgStore()
const recerveMsgList = computed(() => systemMsgStore.systemMsgList.filter(msg => msg.type === SystemMsgType.receive))
const sendMsgList = computed(() => systemMsgStore.systemMsgList.filter(msg => msg.type === SystemMsgType.send))
const currentMsg = ref<any>({})

const systemAudioStore = useSystemAudioStore()
const ringItemAudio = () => {
	systemAudioStore.ringItem()
}

const ringClickAudio = () => {
	systemAudioStore.ringClick()
}

const clickHandle = (row:any) => {
	currentMsg.value = row
	ringClickAudio()
	drawer.value = true
}

// Const dialogVisible = ref(false)
</script>

<style lang="less">
    .msg-modal {
        background: #000000ad;
    }

    .msg-modal-content {
        height: 400px;
        color: white;

        .el-tabs__content {
            background: #3052a8;//#27281e;
            min-height: 328px;
        }

        li {
            font-size: 16px;
            margin: 5px 0;
        }
    }

    .msg-modal-drawer {
        background: #000;
        color: white;
        .el-drawer__header {
            color: white;
        }
    }

    .msg-drawer-bottom {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        width: calc(100% - 40px);
        div {
            margin: 0 10px;
            font-size: 12px;
        }
    }
</style>
