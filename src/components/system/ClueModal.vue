<template>
    <!-- custom-class 已被 废弃，将于版本2.3.0时移除，请使用class。（暂时貌似还用不了？） -->
    <el-dialog
        custom-class="clue-modal"
        v-model="visible"
        :show-close="false"
        @close="close"
    >
        <div class="clue-modal-content">
            <el-tabs type="border-card" @tabChange="ringItemAudio">
                <el-tab-pane label="事件相关">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in eventClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="地点相关">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in positionClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="人物相关">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in personClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="言语相关">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in discourseClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="指纹相关">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in fingerprintClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="历史">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in historyClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="其他">
                    <ul style="cursor:pointer;">
                        <li
                            v-for="(clue, index) in othersClueList"
                            @click="showDrawer(clue)"
                            :key="clue.id"
                        >{{index + 1}}:【{{clue.title}}】</li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
    <el-drawer
        custom-class="clue-modal-drawer"
        v-model="drawer"
        :title="`【${currentClue.title}】`"
        direction="rtl"
    >
    <div>
        <p>
            <span>{{currentClue.content}}</span>
        </p>
        <p style="margin-top:30px;color:#cbcb28;" v-if="currentClue.extraContent">
            <span>☆追加分析：{{currentClue.extraContent}}</span>
        </p>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import {ref, computed} from 'vue'
import {Clue, ClueType} from '@/types/system/clue'
import useSystemAudioStore from '@/state/system/audio'
import useClueStore from '@/state/system/clue'

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

const systemAudioStore = useSystemAudioStore()
const ringItemAudio = () => {
	systemAudioStore.ringItem()
}

const ringClickAudio = () => {
	systemAudioStore.ringClick()
}

const clueStore = useClueStore()
const discourseClueList = computed(() => clueStore.discourseClueList)
const eventClueList = computed(() => clueStore.eventClueList)
const fingerprintClueList = computed(() => clueStore.fingerprintClueList)
const historyClueList = computed(() => clueStore.historyClueList)
const othersClueList = computed(() => clueStore.othersClueList)
const positionClueList = computed(() => clueStore.positionClueList)
const personClueList = computed(() => clueStore.personClueList)
const currentClue = ref<Clue>({
	id: 0,
	type: ClueType.event,
	title: '',
	content: '',
	extraContent: '',
	investigationPoint: 0,
	hasOwned: false,
	hasRead: false
})

const drawer = ref(false)
const showDrawer = (clue: Clue) => {
	currentClue.value = clue
	drawer.value = true
	ringClickAudio()
}

// Const dialogVisible = ref(false)
</script>

<style lang="less">
    .clue-modal {
        background: #000000ad;
    }

    .clue-modal-content {
        height: 400px;
        color: white;

        .el-tabs__content {
            height: 328px;
            overflow: auto;
            min-height: 328px;
            background: #3052a8;//#27281e;
        }

        li {
            font-size: 16px;
            margin: 5px 0;
        }
    }

    .clue-modal-drawer {
        background: #000;
        color: white;
        .el-drawer__header {
            color: white;
        }
    }
</style>
