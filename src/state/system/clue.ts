import {defineStore} from 'pinia'
import type {Clue} from '@/types/system/clue'
import {ClueType} from '@/types/system/clue'
import totalClueList from '@/data/clues'
import lodash from 'lodash-es'

type State = {
	clueList: Clue[];
	needReadNum: number;
}

export default defineStore('systemClueStore', {
	state: (): State => ({
		clueList: totalClueList,
		needReadNum: 0
	}),
	getters: {
		discourseClueList: state => state.clueList.filter(clue => clue.type === ClueType.discourse),
		eventClueList: state => state.clueList.filter(clue => clue.type === ClueType.event),
		fingerprintClueList: state => state.clueList.filter(clue => clue.type === ClueType.fingerprint),
		historyClueList: state => state.clueList.filter(clue => clue.type === ClueType.history),
		othersClueList: state => state.clueList.filter(clue => clue.type === ClueType.others),
		positionClueList: state => state.clueList.filter(clue => clue.type === ClueType.position),
		personClueList: state => state.clueList.filter(clue => clue.type === ClueType.person)
	},
	actions: {
		addClue(id: number) {
			const clue = lodash.cloneDeep(totalClueList.find(clue => clue.id === id))
			if (clue) {
				this.clueList.push(clue)
			}
		},
		getClueDetail(id: number) {
			return this.clueList.find(clue => clue.id === id)
		},
		updateReadStatus(id: number) {
			const msg = this.getClueDetail(id)
			if (msg) {
				msg.hasRead = true
				this.updateNeedReadNum()
			}
		},
		updateNeedReadNum() {
			const num = this.clueList.filter(clue => !clue.hasRead).length
			this.needReadNum = num
		},
		getNeedReadNumOnType(clueType: ClueType) {
			return this.clueList.filter(clue => !clue.hasRead).filter(clue => clue.type === clueType).length
		}
	}
})
