<template>
    <!-- <el-container>的直接子元素必须是后四个组件中的一个或多个。
    后四个组件的亲元素必须是一个 <el-container> -->
    <!-- 本质上是section、header、aside、main、footer 几种原生标签，语义性还挺强的 -->
    <el-container class="j-container">
        <el-header>
            <div class="j-header">
                <!-- 布局 -->
                <div style="display:flex;">
                    <div>首页&nbsp;&nbsp;</div>
                    <div>博客&nbsp;&nbsp;</div>
                    <div>近期异闻&nbsp;&nbsp;</div>
                    <div>关于玉桥镇&nbsp;&nbsp;</div>
                    <div style="width: 300px;">
                        搜索：<el-input />
                    </div>
                    <div>头像</div>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <div class="j-aside">菜单</div>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="j-content">
                        <router-view></router-view>
                    </div>
                </el-main>
                <el-footer>
                    <div class="j-footer">
                        <span>关于我们|</span>
                        <span>招贤纳士|</span>
                        <span>商务合作|</span>
                        <span>寻求报道</span>
                        <span>©龙陵市异闻网络技术公司</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style>
    .j-container {
        height: 100%;
        width: 100%;
        background: #f3f4f6;
    }
    .el-header {
        --el-header-padding: 0;
        /* --el-header-height: 60px; */
    }
    .j-header {
        height: 100%;
        background: #f2f8b9;
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    }
    .j-aside {
        height: 100%;
        margin-top: 20px;
        background: #f2f8b9;
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    }
    .j-content {
        height: 100%;
        background: #f2f8b9;
    }
    .j-footer {
        height: 100%;
        background: #f2f8b9;
        -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    }
</style>
