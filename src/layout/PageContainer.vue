<template>
    <!-- <el-container>的直接子元素必须是后四个组件中的一个或多个。
    后四个组件的亲元素必须是一个 <el-container> -->
    <!-- 本质上是section、header、aside、main、footer 几种原生标签，语义性还挺强的 -->
    <el-container class="page-main-container">
        <el-header>
            <div class="page-main-header">
                <!-- 布局 -->
                <div class="page-main-nav">
                    <div class="items" v-if="false">
                        <div class="item">首页</div>
                        <div class="item">博客</div>
                        <div class="item">近期异闻</div>
                        <div class="item">关于xx</div>
                    </div>
                    <div class="items">
                        <div class="item search">
                            <span>搜索：</span>
                            <el-input v-model="searchKey"/>
                            <el-icon><Search /></el-icon>
                        </div>
                        <div class="item">
                            <el-switch
                                v-model="isDarkMode"
                                class="dark-mode-switch"
                                style="margin-left: 24px"
                                inline-prompt
                                :active-icon="Moon"
                                :inactive-icon="Sunny"
                                @change="triggerDarkMode"
                            />
                        </div>
                        <div class="item">
                            <el-badge is-dot>
                                <span>消息</span>
                            </el-badge>
                        </div>
                        <div class="item avatar">
                            <el-avatar :size="35" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                        </div>
                    </div>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" style="margin-bottom: 20px;">
                <div class="page-main-aside">菜单</div>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="page-main-content">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-footer style="padding: 0;">
            <div class="page-main-footer">
                <span>xxxx|</span>
                <span>xxxx|</span>
                <span>xxxx|</span>
                <span>xxxx</span>
                <span>©xxxxx</span>
            </div>
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Sunny, Moon} from '@element-plus/icons-vue'

const searchKey = ref('')

const isDarkMode = ref(false)
const triggerDarkMode = (val: boolean) => {
	const html:any = document.querySelector('html')
	if (val) {
		html.className = 'dark'
		return
	}

	html.className = ''
}
</script>

<style lang="less">
    .page-main-container {
        height: 100%;
        width: 100%;
        background: var(--app-background-color);
    }
    .el-header {
        --el-header-padding: 0;
        /* --el-header-height: 60px; */
    }
    .page-main-header {
        height: 100%;
        background: var(--app-theme-color);
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    }
    .page-main-aside {
        height: 100%;
        margin-top: 20px;
        background: var(--app-theme-color);
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    }
    .page-main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .items {
            display: flex;
            align-items: center;

            .item {
                padding: 0 10px;
                cursor: pointer;
            }

            .search {
                display: flex;
                align-items: center;
                width: 300px;
                cursor: unset;

                span {
                    flex-basis: 50px;
                }

                .el-input {
                    flex-basis: 230px;
                }

                .el-input__inner {
                    padding-right: 30px;
                }

                .el-icon {
                    position: relative;
                    right: 25px;
                }
            }

            .avatar {
                margin-right: 10px;
            }

            .dark-mode-switch {
                --el-switch-on-color: #4c4d4f;
                --el-switch-off-color: orange;
            }
        }
    }
    .page-main-content {
        height: 100%;
        background: var(--app-theme-color);
    }
    .page-main-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: var(--app-theme-color);
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        font-size: 16px;
    }
</style>
