<template>
    <router-view></router-view>
    <div class="system-dashboard">
        <SystemDashboardVue />
    </div>
    <SystemAudio />
</template>
<script lang="ts" setup>
import SystemDashboardVue from '@/components/system/SystemDashboard.vue'
import SystemAudio from '@/components/system/SystemAudio.vue'
</script>

<style>
.system-dashboard {
    position: fixed;
    bottom: 67px;
    right: 74px;
}
</style>
