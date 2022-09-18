import {defineStore} from 'pinia'
import type {Skill} from '@/types/system/skill'
import {SkillType} from '@/types/system/skill'
import {useSystemStore} from './system'
import totalSkillList from '@/data/skills'

import lodash from 'lodash-es'

type State = {
	needReadNum: number;
	skillList: Skill[];
}

export const useSkillStore = defineStore('systemSkillStore', {
	state: (): State => ({
		skillList: [
			lodash.cloneDeep(totalSkillList[0]),
			lodash.cloneDeep(totalSkillList[1]),
			lodash.cloneDeep(totalSkillList[2])
		],
		needReadNum: 0
	}),
	actions: {
		addSkills() {
			const systemStore = useSystemStore()
			const newSkills = lodash.cloneDeep(totalSkillList.filter(skill => !skill.hasOwned && systemStore.currentVersion.versionNum === skill.needVersion.versionNum))
			const newActions = lodash.cloneDeep(newSkills.filter(skill => skill.type === SkillType.action).map(skill => ({
				skill
			})))
			this.skillList.push(...newSkills)
			systemStore.addActions(newActions)
		}
	}
})
