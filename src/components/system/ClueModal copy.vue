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
                        <li @click="showDrawer">1:【独脚的牛雕像】</li>
                        <li @click="showDrawer">2:【哥哥做的饭】</li>
                        <li @click="showDrawer">3:【冰激凌】</li>
                        <li @click="showDrawer">4:【火灾】</li>
                        <li @click="showDrawer">5:【经纬】</li>
                        <li @click="showDrawer">6:【玉晶桥镇的“玉”】</li>
                        <li @click="showDrawer">7:【寒食散/五石散】</li>
                        <li @click="showDrawer">8:【冰激凌】</li>
                        <li @click="showDrawer">9:【矿工/挖矿】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="地点相关">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【玉晶桥镇】</li>
                        <li @click="showDrawer">2:【晶桥乡】</li>
                        <li @click="showDrawer">3:【玉乡】</li>
                        <li @click="showDrawer">4:【玉湖】</li>
                        <li @click="showDrawer">5:【洛织的家】</li>
                        <li @click="showDrawer">6:【晶桥 ？】</li>
                        <li @click="showDrawer">7:【高塔】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="人物相关">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【调查员(你)】</li>
                        <li @click="showDrawer">2:【代号"Q"】</li>
                        <li @click="showDrawer">3:【分析员】</li>
                        <li @click="showDrawer">4:【蒲伊】</li>
                        <li @click="showDrawer">5:【蒲牵】</li>
                        <li @click="showDrawer">6:【蒲逊】</li>
                        <li @click="showDrawer">7:【洛织】</li>
                        <li @click="showDrawer">8:【兰绮】</li>
                        <li @click="showDrawer">9:【葛帆】</li>
                        <li @click="showDrawer">10:【方寅】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="言语相关">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【蒲伊的话&nbsp;①】</li>
                        <li @click="showDrawer">2:【方寅对调查员说的话】</li>
                        <li @click="showDrawer">3:【洛织的呢喃】</li>
                        <li @click="showDrawer">4:【蒲伊的话&nbsp;②】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="指纹相关">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【盘子上的指纹】</li>
                        <li @click="showDrawer">2:【挖矿机上的指纹】</li>
                        <li @click="showDrawer">3:【天衣无缝】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="历史">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【陨石坑】</li>
                        <li @click="showDrawer">2:【超大型暴雨】</li>
                        <li @click="showDrawer">3:【羽人】</li>
                        <li @click="showDrawer">4:【天衣】</li>
                        <li @click="showDrawer">5:【玉】</li>
                        <li @click="showDrawer">6:【晶】</li>
                        <li @click="showDrawer">7:【炼丹术】</li>
                        <li @click="showDrawer">8:【夔牛】</li>
                        <li @click="showDrawer">9:【玄鸟】</li>
                        <li @click="showDrawer">10:【神】</li>
                        <li @click="showDrawer">11:【古代部落】</li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="其他">
                    <ul style="cursor:pointer;">
                        <li @click="showDrawer">1:【龙陵特侦司】</li>
                        <li @click="showDrawer">2:【异闻博客网】</li>
                        <li @click="showDrawer">3:【异史】</li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
    <el-drawer
        custom-class="clue-modal-drawer"
        v-model="drawer"
        title="【蒲伊的话 ①】"
        direction="rtl"
    >
        <span>“多么奇怪的雕像啊！”蒲伊如此说道，“扭曲的面孔、还有独一无二的单脚。”</span>
  </el-drawer>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
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
const = 

const drawer = ref(false)
const showDrawer = () => {
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
