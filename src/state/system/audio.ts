// 音效素材网站：https://www.aigei.com/sound/ui/?wd=%E5%85%8D%E8%B4%B9%E6%B8%B8%E6%88%8F%E9%9F%B3%E6%95%88
import {defineStore} from 'pinia'

export default defineStore('SystemAudioStore', {
	state: () => ({
		isOpen: false,
		itemRing: false,
		clickRing: false
	}),
	actions: {
		open() {
			this.isOpen = true
		},
		ringItem() {
			this.itemRing = true
		},
		setItemRing(val: boolean) {
			this.itemRing = val
		},
		ringClick() {
			this.clickRing = true
		},
		setClickRing(val: boolean) {
			this.clickRing = val
		}
	}
})
