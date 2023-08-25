<template>
    <svg id="svg" width="400" height="100">
      <rect id="rect" x="0" y="0" width="400" height="100" fill="blue"/>
    </svg>
	<svg id="circle" width="16" height="16">
      <circle cx="8" cy="8" r="8" fill="#f1f1f1"/>
    </svg>
	<img id="defaultCursor" :src="defaultCursorSvg">
</template>
<script lang="ts" setup>
import defaultCursorSvg from '@/assets/cursor/default-cursor.svg'
import Matter from 'matter-js'
import anime from 'animejs/lib/anime.es.js'

// document.body.style.cursor = 'none'

const engine = Matter.Engine.create()
const {world} = engine

world.gravity.x = 0
world.gravity.y = 0

// 两个物体的isStatic属性都被设置为true，它们将被认为是静态物体，不会参与碰撞检测。在Matter.js中，只有至少一个物体的isStatic属性被设置为false，才会进行碰撞检测。
// 如果你想要检测两个物体之间的碰撞，至少其中一个物体的isStatic属性应该被设置为false，以使其成为动态物体。这样，当一个动态物体与一个静态物体发生碰撞时，碰撞事件将被触发。

// 创建一个矩形物体
const rectangle = Matter.Bodies.rectangle(50, 400, 400, 100, {
	isStatic: true
})

// 创建一个鼠标约束
const mouseConstraint = Matter.MouseConstraint.create(engine, {
	mouse: Matter.Mouse.create(document.body),
	constraint: {
		stiffness: 0.2, // 调整刚度参数
		damping: 0.5, // 调整阻尼参数,
		render: {
			visible: false // 隐藏约束线
		}
	}
})

// 将鼠标约束添加到世界中
Matter.World.add(world, mouseConstraint)

// 创建一个光标物体
const cursor = Matter.Bodies.circle(100, 100, 8)
// , {
// isStatic: true, // 设置为静态物体，不受力的影响
// render: {
// 	sprite: {
// 		texture: defaultCursorSvg // 替换为你的光标图像路径
// 	}
// }
// })

// Matter.Body.setDensity(cursor, 0.001)

// 监听鼠标移动事件
const mousePositionTmp = {x: 0, y: 0}
Matter.Events.on(mouseConstraint, 'mousemove', event => {
	// 获取鼠标位置
	const mousePosition = event.mouse.position
	// console.log(mousePosition)

	// 将光标物体的位置设置为鼠标位置
	// Matter.Body.setPosition(cursor, mousePosition)
	// Matter.Body.setVelocity(cursor, {x: 0, y: 1})

	if (mousePositionTmp.x === 0 && mousePositionTmp.y === 0) {
		mousePositionTmp.x = mousePosition.x
		mousePositionTmp.y = mousePosition.y
		Matter.Body.setPosition(cursor, mousePosition)
	}

	// Matter.Body.setPosition(cursor, mousePosition)

	const force = {
		x: (mousePosition.x - mousePositionTmp.x) * 0.001,
		y: (mousePosition.y - mousePositionTmp.y) * 0.001
	}

	console.log(mousePositionTmp, mousePosition, force)

	if (mousePositionTmp.y !== 0 && mousePositionTmp.y !== 0) {
		// 施加力到物体上
		Matter.Body.applyForce(cursor, cursor.position, force)
		mousePositionTmp.x = mousePosition.x
		mousePositionTmp.y = mousePosition.y
	}

	setTimeout(() => {
		Matter.Body.setVelocity(cursor, {x: 0, y: 0}) // 停止之前的力
	}, 10)
})

rectangle.restitution = 0.1
cursor.restitution = 0.1

// 将物体添加到世界中
Matter.World.add(world, rectangle)
Matter.World.add(world, cursor)

// 使用anime.js创建动画
// anime({
// 	targets: cursor.position,
// 	x: 0,
// 	y: 0,
// 	update() {
// 		// 在每个动画帧中更新物体的位置
// 		console.log(1)
// 		Matter.Body.setPosition(cursor, cursor.position)
// 	}
// })

const animation = anime({
	targets: '#defaultCursor',
	duration: 2000,
	easing: 'easeInOutQuad',
	autoplay: false
})

// 在每一帧更新时更新Matter.js引擎
Matter.Events.on(engine, 'beforeUpdate', () => {
	const {position: p} = cursor
	// console.log(p)
	anime.set('#defaultCursor', {
		position: 'absolute',
		left: (p.x),
		top: (p.y)
	})
	anime.set('#circle', {
		position: 'absolute',
		left: (p.x),
		top: (p.y)
	})

	const {position} = rectangle
	anime.set('#svg', {
		position: 'absolute',
		left: (position.x - 200),
		top: (position.y - 50)
	})
})

// 监听碰撞事件
Matter.Events.on(engine, 'collisionStart', event => {
	const {pairs} = event

	// console.log(pairs[0])

	// 遍历所有碰撞对
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i]

		// console.log(pair.bodyA, pair.bodyB)
		// 如果光标物体与刚体发生碰撞
		if (pair.bodyA === cursor || pair.bodyB === cursor) {
		// 在控制台输出碰撞信息
			console.log('Cursor collided with a body!')
		}
	}
})

animation.play()

// 启动Matter.js引擎
Matter.Runner.run(engine)

</script>
<style lang="less" scoped>

</style>
