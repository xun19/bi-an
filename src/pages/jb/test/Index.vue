<template>
    <div class="container">
        <button @click="show1=true">show1</button>
        <ClueModal
            v-model:visible="show1"
        />
        <button @click="show2=true">show2</button>
        <MsgModal
            v-model:visible="show2"
        />
        <button @click="show3=true">show3</button>
        <SettingsModal
            v-model:visible="show3"
        />
    </div>
</template>
<script lang="ts" setup>
import ClueModal from '@/components/system/ClueModal.vue'
import MsgModal from '@/components/system/MsgModal.vue'
import SettingsModal from '@/components/system/SettingsModal.vue'

import {ref} from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)

</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    background: #f2f8b9!important;
}
</style>
