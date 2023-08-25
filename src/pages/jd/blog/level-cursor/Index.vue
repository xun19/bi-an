<template>
    <CursorAria>
      <div>
          <h2>This is a Title～</h2>
          <div class="wall"></div>
          <div style="display:flex;justify-content: space-evenly;">
              <div style="width: 300px;">
              </div>
              <div style="font-size: 16px;">
                  <p style="margin: 10px 0;">
                      <span>Back to home，it's HAPPY！</span>
                  </p>
                  <p>
                      <span>Let's do some searching.</span>
                  </p>
              </div>
          </div>
      </div>
    </CursorAria>
</template>
<script lang="ts" setup>
import CursorAria from '@/components/common/CursorAria.vue'

</script>
<style lang="less" scoped>
.wall {
  display: inline-block;
  height: 100px;
  width: 50px;
  background-color: #fff;
}
</style>
