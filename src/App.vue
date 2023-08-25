<script setup lang="ts">
</script>
<template>
  <router-view></router-view>
</template>

<style lang="less">
/* 不能带scoped */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td {
  margin:0;
  padding:0;
}

body {
  background:#fff;
  color: var(--app-font-color);
  font-size:14px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
}

td,th,caption {
  font-size:14px;
}
/* h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; } */
address, caption, cite, code, dfn, em, strong, th, var {
  font-style:normal;
  font-weight:normal;
}
a {
  color: val(--app-font-color);
  text-decoration:none;
}
a:hover {
  text-decoration:underline;
}
img { border:none; }
ol,ul,li { list-style:none; }
input, textarea, select, button { font:14px Verdana,Helvetica,Arial,sans-serif; }
table { border-collapse:collapse; }
html {overflow-y: scroll;}

.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}

html, body, #app {
  height: 100%;
  width: 100%;
}

// CSS自定义变量
:root {
  --container-color: #00000096; //#fafafa; // ？？
}

/* 暗黑模式切换 */
html {
  // 页面整体布局相关
  --app-theme-color: #f2f8b9;
  --app-background-color: #f3f4f6;
  --app-font-color: #000;
}
html.dark {
  // 页面整体布局相关
  --app-theme-color: #00000096;
  --app-background-color: #292929;
  --app-font-color: #fff;
}

/* 自定义光标 */
.cursor-default {
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/default-cursor.svg'), auto; // shoot.svg
}
.cursor-shoot {
    /* 需要一个判定区域？ */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/s.svg') 16 16, auto; // shoot.svg
}
.cursor-shoot1 {
    /* 需要一个判定区域？ */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/s1.svg') 16 16, auto;
}
.cursor-search {
    /* 逗号分隔依次的选项。最后一个必须是一个关键字，以防所有图片加载不出时显示（填auto即可） */
    /* 图片大小不能过大。这里svg选择16的尺寸 */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/search.svg') 16 8, auto;
}
.cursor-del {
    /* 需要细节比较明显的svg选择48的尺寸 */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/del.svg'), auto;
}
.cursor-del-red {
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/del-red.svg'), auto;
}
.cursor-injection {
    /* 需要细节比较明显的svg选择48的尺寸 */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/injection.svg'), auto;
}
.cursor-injection-red {
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/injection-red.svg'), auto;
}
.cursor-rescue {
    /* 需要细节比较明显的svg选择48的尺寸 */
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/rescue.svg'), auto;
}
.cursor-rescue-red {
    cursor: url('http://127.0.0.1:5174/src/assets/cursor/rescue-red.svg'), auto;
}
</style>
