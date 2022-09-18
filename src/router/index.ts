import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHashHistory} from 'vue-router'

const x = 'MZLSKQWOO=LPOW'
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/test',
		children: [
			{
				path: '/jb',
				redirect: '/jb/test',
				component: async () => import('@/layout/PageContainer.vue'),
				children: [
					{
						path: 'demo',
						// '@/pages/jb/demo/Index.vue' (demo/index) 有毒？
						component: async () => import('@/pages/jb/demos/Index.vue')
					},
					{
						path: 'watcher',
						component: async () => import('@/pages/jb/watcher/Index.vue')
					},
					{
						path: 'blog',
						redirect: '/jb/blog/level1',
						component: async () => import('@/pages/jb/blog/Index.vue'),
						children: [
							{
								path: 'level1',
								component: async () => import('@//pages/jb/blog/level1/Index.vue')
							},
							{
								path: `${x}`, // 引入加密字符串变量？
								component: async () => import('@//pages/jb/blog/level1/Index.vue')
							}
							// Fangjia kui
							// dianli
							// genzong
							// wuhui
							// chongtu
							// jiemi jiejue
							// end1 end2 end3(jiang lin)
							// 先写类（类型）
							// hooks？
						]
					}
				]
			},
			{
				path: 'test',
				component: async () => import('@/pages/jb/test/Index.vue')
			}
		]
	}
]

const router = createRouter({
	routes,
	history: createWebHashHistory()
})

export default router

// Level 1: 中间时间 （事件起始）
// level 2: 个人主页 【可通过解锁“查看全部”（收集新线索 破解加密 3W）回溯过去内容】
// 主要脉络：一个误会、一个追赶、一个解决
// 龙陵异闻录
