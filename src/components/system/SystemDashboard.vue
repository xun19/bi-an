<template>
    <!-- 可收起/展开，以防某些时候妨碍页面视线和交互 -->
    <div class="container">
        <el-progress 
            type="dashboard" 
            :stroke-width="8"
            :width="150"
            :percentage="percentage" 
            :color="colors"
        >
            <div class="investigation-points">{{percentage}}/{{nextVersion.needInvestigationPoints}}</div>
            <div class="version">当前版本:&nbsp;{{currentVersion.versionNum}}</div>
        </el-progress>
        <div class="dark-dashboard">
            <el-progress 
                type="dashboard" 
                :stroke-width="3"
                :width="50"
                :percentage="darkPercentage" 
                :color="darkColor"
            >
                <!-- <div style="font-weight: 600;transform:scale(0.8);">{{darkPercentage}}%</div> -->
                <a class="warn" title="暗化值">
                    <el-image
                        class="warn-icon"
                        fit="fill"
                        :src="warnIcon"
                    />
                </a>
            </el-progress>
        </div>
        <a 
            class="feature clue" 
            title="线索"
            @click="showModal('clue')"
        >
            <el-image
                class="feature-icon"
                fit="fill"
                :src="clueIcon"
            />
        </a>
        <a 
            class="feature settings" 
            title="设置"
            @click="showModal('settings')"
        >
            <el-image
                class="feature-icon"
                fit="fill"
                :src="settingsIcon"
            />
        </a>
        <a 
            class="feature skill" 
            title="能力"
            @click="showModal('skill')"
        >
            <el-image
                class="feature-icon"
                fit="fill"
                :src="skillIcon"
            />
        </a>
        <a 
            class="feature msg" 
            title="邮件"
            @click="showModal('msg')"
        >
            <el-image
                class="feature-icon"
                fit="fill"
                :src="msgIcon"
            />
        </a>
        <div class="action-tab">
            <el-carousel 
                height="20px" 
                arrow="always" 
                :autoplay="false" 
                trigger="click"
                @change="changeAction"
            >
                <el-carousel-item v-for="item in skillActionList" :key="item">
                    <!-- <a :title="`当前动作:${item}`"> -->
                        <h3 text="2xl" justify="center">{{ item.actionAlias }}</h3>
                    <!-- </a> -->
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    <SkillsModal
        v-model:visible="modalConfigs.skill"
    />
    <SettingsModal
        v-model:visible="modalConfigs.settings"
    />
    <ClueModal
        v-model:visible="modalConfigs.clue"
    />
    <MsgModal
        v-model:visible="modalConfigs.msg"
    />
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import SkillsModal from './SkillsModal.vue'
import MsgModal from './MsgModal.vue'
import SettingsModal from './SettingsModal.vue'
import ClueModal from './ClueModal.vue'
import { ModalType } from '@/types/system/modal'

import { useSystemStore } from '@/state/system/system'
import { useSkillStore } from '@/state/system/skill'
import { SkillType } from '@/types/system/skill'
import useSystemAudioStore from '@/state/system/audio'

import clueIcon from '@/assets/system/clue.svg'
import settingsIcon from '@/assets/system/settings.svg'
import skillIcon from '@/assets/system/skill.svg'
import msgIcon from '@/assets/system/msg.svg'
import warnIcon from '@/assets/system/warn.svg'

const systemAudioStore = useSystemAudioStore()
const ringItemAudio = () => {
    systemAudioStore.ringItem()
}
const ringClickAudio = () => {
    systemAudioStore.ringClick()
}


const modalConfigs = reactive({
    skill: false,
    clue: false,
    msg: false,
    settings: false
})
const showModal = (key: ModalType) => {
    Object.keys(modalConfigs).forEach((i) => {
        const k = i as ModalType
        modalConfigs[k] = false
    })
    modalConfigs[key] = true
    ringItemAudio()
}
const changeAction = () => {
    ringClickAudio()
}

const systemStore = useSystemStore()
const currentVersion = computed(() => systemStore.currentVersion)
const nextVersion = computed(() => systemStore.nextVersion)

const skillStore = useSkillStore()
const skillActionList = computed(() => skillStore.skillList.filter(item => item.type === SkillType.action))


const percentage = ref(0)
const darkPercentage = ref(0) // TODO: 实际上就是惩罚值吧？每弄错一个步骤，就会增加暗化值（即增加惩罚）。那么可以这个消除么，通过特定方式、或者消灭特定敌人？
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
const darkColor = [
  { color: 'red', percentage: 20 },
  { color: 'red', percentage: 40 },
  { color: 'red', percentage: 60 },
  { color: 'red', percentage: 80 },
  { color: 'red', percentage: 100 },
]

onMounted(() => {
  setInterval(() => {
    percentage.value = (percentage.value % 100) + 10
  }, 500)
  setInterval(() => {
    darkPercentage.value = (darkPercentage.value % 100) + 4
  }, 1000)
})

</script>

<style scoped lang="less">
.container {
    position: relative;
    background: var(--container-color);
    padding: 10px;
    border-radius: 100%;
    border: 4px #cdcdcd solid;
    cursor: pointer!important;

    .investigation-points{
        margin-bottom: 15px;
        color: white;
    }

    .version{
        color: white;
        font-size: 12px;
    }

    .dark-dashboard {
        position: absolute;
        right: -56px;
        bottom: -2px;
        background: var(--container-color);
        padding: 1px;
        border-radius: 100%;
        border: 2px #cdcdcd solid;
    }

    .feature {
        position: absolute;
        width: 50px;
        height: 50px;
        background: var(--container-color);
        border-radius: 100%;
        border: 4px #00000000 solid;// 4px #cdcdcd solid;
        .feature-icon {
            width: 100%;
            height: 100%;
            padding: 7px;
            box-sizing: border-box;
        }
        &.clue {
            top: -71px;
            left: 86px;
        }
        &.settings {
            top: -20px;
            right: -46px;
        }
        &.skill {
            top: -57px;
            left: 0px;
            .feature-icon{
                padding: 5px;
            }
        }
        &.msg {
            top: 56px;
            right: -53px;
            width: 30px;
            height: 30px;
            .feature-icon{
                padding: 7px;
            }
        }
    }

    .warn {
        display: inline-block;
        width: 30px;
        height: 30px;
        .warn-icon {
            width: 100%;
            height: 100%;
        }
    }

    .action-tab {
        position: absolute;
        bottom: -33px;
        left: 1px;
        width: 180px;

        .el-carousel__item h3 {
            color: #194bb4;
            line-height: 20px;
            margin: 0;
            text-align: center;
        }
        :deep(.el-carousel__button) {
            display: none!important;
        }
    }
}
</style>





