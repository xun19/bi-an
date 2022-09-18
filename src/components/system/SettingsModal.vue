<template>
    <!-- custom-class 已被 废弃，将于版本2.3.0时移除，请使用class。（暂时貌似还用不了？） -->
    <el-dialog
        custom-class="settings-modal"
        v-model="visible"
        :width="800"
        :show-close="false"
        @close="close"
    >
        <div class="settings-modal-content">
            <el-tabs type="border-card">
                <el-tab-pane label="Type1">
                    <div style="margin: 0 60px;">
                        <el-slider v-model="value1" />
                    </div>
                    <div style="margin: 0 60px;">
                        <el-slider v-model="value2" />
                    </div>
                    <div style="margin: 0 60px;">
                        <el-slider v-model="value3" />
                    </div>
                    <div style="margin: 0 60px;">
                        <el-slider v-model="value4" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Type2">
                    <div style="margin: 0 60px;">
                        <el-slider v-model="value5" />
                    </div>
                    <div style="margin: 0 60px;">
                        <el-switch v-model="value6" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
    <el-drawer
        custom-class="settings-modal-drawer"
        v-model="drawer"
        title="I am the title"
        direction="rtl"
    >
        <span>Hi, there!</span>
  </el-drawer>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
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

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6 = ref(true)

// Const dialogVisible = ref(false)
</script>

<style lang="less">
    .settings-modal {
        background: #000000ad;
    }

    .settings-modal-content {
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

    .settings-modal-drawer {
        // background: #000;
        color: white;
        .el-drawer__header {
            color: white;
        }
    }
</style>
