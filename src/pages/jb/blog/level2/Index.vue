<template>
    <el-affix position="top" :offset="0">
        <el-button type="primary">Target container</el-button>
    </el-affix>
    <div style="height:1300px;">
        <div class="affix-container">
            <el-affix target=".affix-container" :offset="0">
                <div>1111</div>
            </el-affix>
            <el-affix target=".affix-container" :offset="20">
                <div>2222</div>
            </el-affix>
            <el-affix target=".affix-container" :offset="40">
                <div>3333</div>
            </el-affix>
        </div>
    </div>
</template>
<script lang="ts" setup>
// import {dropBottom} from './index'

// dropBottom()
</script>

<style scoped>
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>
