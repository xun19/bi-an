<template>
    <el-dialog
        custom-class="skill-modal"
        v-model="visible"
        :show-close="false"
        @close="close"
    >
        <el-tabs type="border-card" @tabChange="ringItemAudio">
            <el-tab-pane label="行动">
                <div class="skill-item-container">
                    <el-popover
                        v-for="(skill) in skillActionList"
                        popper-class="skill-item-popover"
                        :title="skill.name"
                        placement="bottom"
                        :width="350"
                        trigger="click"
                        :key="skill.id"
                    >
                        <p>{{skill.description}}</p>
                        <template #reference>
                            <a class="skill-item-title" :title="skill.name">
                                <el-image
                                    class="skill-item"
                                    fit="fill"
                                    :src="skill.icon"
                                />
                            </a>
                        </template>
                    </el-popover>
                </div>
            </el-tab-pane>
            <el-tab-pane label="效果">
                <div class="skill-item-container">
                    <el-popover
                        v-for="(skill) in skillPassiveList"
                        popper-class="skill-item-popover"
                        :title="skill.name"
                        placement="bottom"
                        :width="400"
                        trigger="click"
                        :key="skill.id"
                    >
                        <p>{{skill.description}}</p>
                        <template #reference>
                            <a class="skill-item-title" :title="skill.name">
                                <el-image
                                    class="skill-item"
                                    fit="fill"
                                    :src="skill.icon"
                                />
                            </a>
                        </template>
                    </el-popover>
                </div>
            </el-tab-pane>
            <el-tab-pane label="隐秘">
                <div class="skill-item-container">
                    <el-popover
                        v-for="(skill) in skillCovertList"
                        popper-class="skill-item-popover"
                        :title="skill.name"
                        placement="bottom"
                        :width="400"
                        trigger="click"
                        :key="skill.id"
                    >
                        <p>{{skill.description}}</p>
                        <template #reference>
                            <a class="skill-item-title" :title="skill.name">
                                <el-image
                                    class="skill-item"
                                    fit="fill"
                                    :src="skill.icon"
                                />
                            </a>
                        </template>
                    </el-popover>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>
<script lang="ts" setup>
import {useSkillStore} from '@/state/system/skill'
import {SkillType} from '@/types/system/skill'
import useSystemAudioStore from '@/state/system/audio'
import {computed} from 'vue'

defineProps({
	visible: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(['update:visible'])

const systemAudioStore = useSystemAudioStore()
const ringItemAudio = () => {
	systemAudioStore.ringItem()
}

const close = () => {
	emits('update:visible', false)
	// SystemAudioStore.setItemRing(false)
}

const skillStore = useSkillStore()
const skillActionList = computed(() => skillStore.skillList.filter(item => item.type === SkillType.action))
const skillPassiveList = computed(() => skillStore.skillList.filter(item => item.type === SkillType.passive))
const skillCovertList = computed(() => skillStore.skillList.filter(item => item.type === SkillType.covert))

</script>

<style lang="less">
.skill-modal {
    background: #000000ad;
    .el-tabs__content {
        background: #3052a8;//#27281e;
        min-height: 328px;
        color: white;
    }
}

.skill-item-container {
    height: 450px;

    .skill-item-title {
        .skill-item {
            width: 70px;
            height: 70px;
            margin: 5px;
            padding: 5px;
            box-sizing: border-box;
            background: black;
            cursor: pointer!important;
        }

        &:first-child {
            .skill-item {
                padding: 10px;
            }
        }
    }
}

.skill-item-popover {
    background: #000000bf!important;
    color: #fff!important;

    p {
        line-height: 26px;
    }

    .el-popover__title {
        text-align: center;
        font-size: 18px;
        color: #fff;
    }
    .el-popper__arrow::before {
        background: #181818!important;// #434343bf!important; //#000000bf!important;
    }
}
</style>
