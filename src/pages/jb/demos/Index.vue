<template>
    <div id="Watcher" class="watcher">
        <div id="EyeBall" class="eye-ball"></div>
    </div>
    <!-- <div class="cursor-area cursor-search"></div>
    <div :class="{'cursor-area': true, 'cursor-shoot': red}"></div> -->
    <!-- <div :class="{'cursor-area': true, 'cursor-del': !red, 'cursor-del-red': red}"></div>
    <div :class="{'cursor-area': true, 'cursor-injection': !red, 'cursor-injection-red': red}"></div>
    <div :class="{'cursor-area': true, 'cursor-rescue': !red, 'cursor-rescue-red': red}"></div> -->
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import nerdamer from 'nerdamer'
import 'nerdamer/Solve'

const red = ref<Boolean>(false)
setInterval(() => {
    red.value = !red.value
}, 200)

const computePoint1 = (circle: any, line: any[]) => {
    const [[x1, y1], [x2, y2]] = line
    const { x3, y3, r } = circle
    if (x1 === x2 && y1 === y2) return null // 两点

    // 两点式：(y-y1)/(y2-y1)=(x-x1)/(x2-x1)
    // 关系换算（式子1）：y = (y2-y1)(x-x1)/(x2-x1) + y1
    // 圆方程：(x - x3)^2 + (y - y3)^2 = r^2
    // 代入式子1：(x - x3)^2 + ((y2-y1)(x-x1)/(x2-x1) + y1 - y3)^2 = r^2
    const s = `(x-${x3})^2 + ((${y2}-${y1})*(x-${x1})/(${x2}-${x1}) + ${y1} - ${y3})^2 = ${r}^2`
    const [solution_x1, solution_x2] = JSON.parse(nerdamer.solve(s, 'x').text())
    const solution_y1 = (y2-y1)*(solution_x1-x1)/(x2-x1) + y1
    const solution_y2 = (y2-y1)*(solution_x2-x1)/(x2-x1) + y1
    return [[solution_x1, solution_y1], [solution_x2, solution_y2]]
}

// 改为点
const computePoints = (circle: any, point: any[]) => {
    const [x1, y1] = point
    const { x2, y2, r } = circle
    if (x1 === x2 && y1 === y2) return [[], []] // 点刚好在圆心上
    // 两点式：(y-y1)/(y2-y1)=(x-x1)/(x2-x1)
    // 关系换算（式子1）：y = (y2-y1)*(x-x1)/(x2-x1) + y1
    // 圆方程：(x - x2)^2 + (y - y2)^2 = r^2
    // 代入式子1：(x - x2)^2 + ((y2-y1)(x-x1)/(x2-x1) + y1 - y2)^2 = r^2
    const s = `(x-${x2})^2 + ((${y2}-${y1})*(x-${x1})/(${x2}-${x1}) + ${y1} - ${y2})^2 = ${r}^2`
    const [solution_x1, solution_x2] = JSON.parse(nerdamer.solve(s, 'x').text())
    const solution_y1 = (y2-y1)*(solution_x1-x1)/(x2-x1) + y1
    const solution_y2 = (y2-y1)*(solution_x2-x1)/(x2-x1) + y1
    return [[solution_x1, solution_y1], [solution_x2, solution_y2]]
}

const computePoint = (point1:any, [point2, point3]: [any, any]) => { // 计算最近点
    const [x1, y1] = point1
    const [x2, y2] = point2
    const [x3, y3] = point3
    const d1 = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
    const d2 = Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2)
    if (d1 >= d2) return point3
    else return point2
}

const computeLeftTopPoint = (center: any[], pointOfTangency: any[], r: number) => {
    const [centerx, centery] = center
    const [potx, poty] = pointOfTangency
    // 两点式：(y-centery)/(poty-centery)=(x-centerx)/(potx-centerx)
    // 关系换算（式子1）：y = (poty-centery)*(x-centerx)/(potx-centerx) + centery
    // 小圆圆心与切点距离关系(可求得两点): (x - potx)^2 + (y - poty)^2 = r^2
    // 代入：(x - potx)^2 + ((poty-centery)*(x-centerx)/(potx-centerx) + centery - poty)^2 = r^2
    // 右边归零：(x - potx)^2 + ((poty-centery)*(x-centerx)/(potx-centerx) + centery - poty)^2 - r^2 = 0
    const s = `(x - ${potx})^2 + ((${poty}-${centery})*(x-${centerx})/(${potx}-${centerx}) + ${centery} - ${poty})^2 = ${r}^2`
    const [solution_x1, solution_x2] = JSON.parse(nerdamer.solve(s, 'x').text())
    const solution_y1 = (poty-centery)*(solution_x1-centerx)/(potx-centerx) + centery
    const solution_y2 = (poty-centery)*(solution_x2-centerx)/(potx-centerx) + centery
    const d1 = Math.pow(solution_x1 - centerx, 2) + Math.pow(solution_y1 - centery, 2)
    const d2 = Math.pow(solution_x2 - centerx, 2) + Math.pow(solution_y2 - centery, 2)
    const res = d1 <= d2 ? [solution_x1, solution_y1] : [solution_y2, solution_y2] // 选择离大圆圆心近的, 作为小圆圆心
    return [res[0] - r, res[1] - r] // 左上角坐标
}

const canCompute = ref(true)


onMounted(() => {
    // const s = computePoint1({
    //     x3: 0,
    //     y3: 0,
    //     r: 10
    // }, [[0, 0], [10, 10]])
    // console.log(s)
    // const s = computePoint({
    //     x2: 0, y2: 0, r: 10
    // }, [10, 10])
    // console.log(s)
    const watcher: any = document.getElementById('Watcher')
    const eyeBall: any = document.getElementById('EyeBall')
    // console.log(nerdamer.solve('x^2-4', 'x').text())
    document.onmousemove = (event) => {
    setTimeout(() => {
        if (!canCompute.value) return 
        canCompute.value = false
        const evt = event || window.event
        const mouseX = evt.clientX
        const mouseY = evt.clientY
        const watcherOriginX = watcher.offsetLeft + watcher.offsetWidth / 2
        const watcherOriginY = watcher.offsetTop + watcher.offsetHeight / 2
        // const eyeballX = mouseX - watcherOriginX + watcher.offsetWidth / 2
        // const eyeballY = mouseY - watcherOriginY + watcher.offsetHeight / 2
        // eyeBall.style.left = `${eyeballX}px`
        // eyeBall.style.top = `${eyeballY}px`
        const [point1, point2] = computePoints({
            x2: watcherOriginX, y2: watcherOriginY, r: 100
        }, [mouseX, mouseY])
        const [eyeballScreenX, eyeballScreenY] = computePoint([mouseX, mouseY], [point1, point2]) // 相对于屏幕的坐标
        const pointOfTangencyX = eyeballScreenX - watcher.offsetLeft // 切点的x值，相对于容器
        const pointOfTangencyY = eyeballScreenY - watcher.offsetTop // 切点的y值，相对于容器
        const [eyeballX, eyeballY] = computeLeftTopPoint([100, 100], [pointOfTangencyX, pointOfTangencyY], 15) // 第一个圆心参数也传容器坐标系内的坐标
        eyeBall.style.left = `${eyeballX}px`
        eyeBall.style.top = `${eyeballY}px`
        // eyeBall.style.left = `${pointOfTangencyX}px`
        // eyeBall.style.top = `${pointOfTangencyY}px`
        // console.log(evt.clientX, evt.clientY)
        // console.log(watcher.offsetLeft, watcher.offsetTop)
        // console.log(watcher.offsetLeft + watcher.offsetWidth / 2, watcher.offsetTop + watcher.offsetHeight / 2)
        // eyeBall.style.left = evt.clientX - eyeBall.offsetWidth / 2 + "px";
        // eyeBall.style.top = evt.clientY - eyeBall.offsetHeight / 2 + "px";

        // (y-y1)/(y2-y1)=(x-x1)/(x2-x1) 
        // ax = y
        // x^2 + y^2 = r^2

        // 原点，即bigEye中心位置，页面中心
        // let origin = [watcherOriginX, watcherOriginY];
        // // 鼠标坐标
        // let mouseCoords = [evt.clientX - origin[0], origin[1] - evt.clientY];
		// // 旋转角度
        // let eyeXDeg = mouseCoords[1] / (watcherOriginY * 2) * 80; // 这里的80代表的是最上下边缘大眼X轴旋转角度
        // let eyeYDeg = mouseCoords[0] / (watcherOriginX * 2) * 60;
        // watcher.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`;
        // eyeball.style.transform = `translate(${eyeYDeg / 1.5}px, ${-eyeXDeg / 1.5}px)`;

        // https://juejin.cn/post/7132409301380890660
        canCompute.value = true
    }, 0)
    }
})
</script>

<style>
    .watcher {
        position: relative;
        /* top: 0;
        left: 0; */
        display: inline-block;
        width: 200px;
        height: 200px;
        /* margin: 20px; */
        background: white;
        border-radius: 100%;
    }
    .eye-ball {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        border: 3px white solid;
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        background: black;
        border-radius: 100%;
    }
    .cursor-area {
        display: inline-block;
        width: 200px;
        height: 200px;
        margin: 20px;
        background: white;
    }
    .cursor-shoot {
        /* 需要一个判定区域？ */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/shoot.svg'), auto;
    }
    .cursor-search {
        /* 逗号分隔依次的选项。最后一个必须是一个关键字，以防所有图片加载不出时显示（填auto即可） */
        /* 图片大小不能过大。这里svg选择16的尺寸 */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/search.svg'), auto;
    }
    .cursor-del {
        /* 需要细节比较明显的svg选择48的尺寸 */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/del.svg'), auto;
    }
    .cursor-del-red {
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/del-red.svg'), auto;
    }
    .cursor-injection {
        /* 需要细节比较明显的svg选择48的尺寸 */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/injection.svg'), auto;
    }
    .cursor-injection-red {
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/injection-red.svg'), auto;
    }
    .cursor-rescue {
        /* 需要细节比较明显的svg选择48的尺寸 */
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/rescue.svg'), auto;
    }
    .cursor-rescue-red {
        cursor: url('http://127.0.0.1:5173/src/assets/cursor/rescue-red.svg'), auto;
    }
</style>