<template>
    <div class="cursor-search">
    <!-- 每个网页只能拥有一个<H1>标签 -->
    <!-- <h1>中使用的关键词，往往是在网页标题中使用的。
    <h1>尽量靠近在html 中的<body>标签，越近越好，以便让搜索引擎最快的领略主题。 -->
    <!-- 所以h1的样式默认是font: xx em; 是有道理的，因为h5默认父元素就应该是body -->
    <!-- https://blog.csdn.net/bianchengxiaosheng/article/details/8727204 -->
    <!--为什么H2比H1大（回头再看吧）？ https://www.itbaoku.cn/post/867990.html -->
        <h2>故乡老家的园地～❤️</h2>
        <div style="display:flex;justify-content: space-evenly;">
            <div style="width: 300px;">
                <el-image style="width: 500px;" :src="src" fit="fill"/>
            </div>
            <div style="font-size: 16px;">
                <p style="margin: 10px 0;">
                    <span>回到了故乡，真开心啊！</span>
                </p>
                <p>
                    <CluePoint>
                        <span>哥哥还是那副愁眉苦脸的样子⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽</span>
                    </CluePoint>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import src from '@/assets/images/puyi2.jpeg'
import CluePoint from '@/components/system/CluePoint.vue'
</script>
<style>
    .cursor-search {
        /* 逗号分隔依次的选项。最后一个必须是一个关键字，以防所有图片加载不出时显示（填auto即可） */
        /* 图片大小不能过大。这里svg选择16的尺寸 */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/search.svg'), auto;
    }
</style>
