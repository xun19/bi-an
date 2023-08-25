<template>
    <router-view></router-view>
    <div class="system-dashboard">
        <SystemDashboardVue v-if="false"/>
    </div>
    <SystemAudio v-if="false"/>
    <Terminal v-if="false"/>
</template>
<script lang="ts" setup>
import SystemDashboardVue from '@/components/system/SystemDashboard.vue'
import SystemAudio from '@/components/system/SystemAudio.vue'
import Terminal from '@/components/terminal/Terminal.vue'
</script>

<style>
.system-dashboard {
    position: fixed;
    bottom: 67px;
    right: 74px;
}
</style>
