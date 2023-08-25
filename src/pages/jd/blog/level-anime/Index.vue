<template>
    <!-- <CursorAria>
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
    </CursorAria> -->
    <svg id="svg" width="1000" height="1000">
      <circle id="circle" cx="100" cy="100" r="50" fill="red" />
      <rect id="rect" x="50" y="400" width="400" height="30" fill="blue"/>
    </svg>
    <!-- <svg width="400" height="400">
    </svg> -->
</template>
<script lang="ts" setup>
// import CursorAria from '@/components/common/CursorAria.vue'
import Matter from 'matter-js'
import anime from 'animejs/lib/anime.es.js'

const animation = anime({
	targets: '#circle',
	cx: 300,
	duration: 2000,
	easing: 'easeInOutQuad',
	autoplay: false
})

const animation2 = anime({
	targets: '#rect',
	cx: 300,
	duration: 2000,
	easing: 'easeInOutQuad',
	autoplay: false
})

// 创建一个Matter.js引擎实例
const engine = Matter.Engine.create()
const {world} = engine

// 世界重力
// engine.gravity.x = 1
// engine.gravity.y = 0

// 设置世界的边界框
const worldWidth = 1080
const worldHeight = 1220

// 请确保在使用world.bounds之前，你已经通过Matter.Bounds.create方法创建了一个边界对象，并将其赋值给world.bounds
// const bounds = Matter.Bounds.create()
const bounds = Matter.Bounds.create({
	min: {x: 0, y: 0},
	max: {x: worldWidth, y: worldHeight}
})
world.bounds = bounds

// Set the world bounds manually
// world.bounds.min.x = 80
// world.bounds.min.y = 220
// world.bounds.max.x = parseFloat(worldWidth)
// world.bounds.max.y = parseFloat(worldHeight)

// 创建一个SVG图形的刚体
const circleBody = Matter.Bodies.circle(100, 100, 50)
const rectBody = Matter.Bodies.rectangle(50, 400, 400, 30, {isStatic: true})
circleBody.restitution = 1
rectBody.restitution = 1

// Matter.Body.setVelocity(rectBody, {x: 0, y: 0})

// 将刚体添加到世界中
Matter.World.add(world, circleBody)
Matter.World.add(world, rectBody)

// let x = 50
// setInterval(() => {
// 	if (x > 55) {
// 		x--
// 	}

// 	if (x <= 50) {
// 		x++
// 	}

// 	console.log(x)
// 	Matter.Body.setPosition(rectBody, {x, y: 400})
// }, 500)

// 监听
Matter.Events.on(engine, 'collisionStart', event => {
	const {pairs} = event

	// 遍历碰撞对
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i]

		// 获取碰撞的两个物体
		const {bodyA} = pair
		const {bodyB} = pair

		// 处理碰撞逻辑
		console.log('物体A:', bodyA, '物体B:', bodyB)
	}
})

// Matter.Composite.add(world, [
// 	// walls
// 	Matter.Bodies.rectangle(200, 200, 400, 30, {isStatic: true}),
// ])

// 在每一帧更新时更新Matter.js引擎
Matter.Events.on(engine, 'beforeUpdate', () => {
	const {position} = circleBody
	anime.set('#circle', {cx: Math.ceil(position.x), cy: Math.ceil(position.y)})
	const {position: p} = rectBody
	if (p.x > 55) {
		p.x--
	}

	if (p.x <= 50) {
		p.x++
	}

	console.log(p.x)

	Matter.Body.setPosition(rectBody, {x: p.x, y: 400})
	anime.set('#rect', {x: (p.x), y: (p.y)})
})

// 启动Matter.js引擎
Matter.Runner.run(engine)

// 启动anime.js动画
animation.play()
animation2.play()

</script>
<style lang="less" scoped>
.wall {
  display: inline-block;
  height: 100px;
  width: 50px;
  background-color: #fff;
}
</style>
