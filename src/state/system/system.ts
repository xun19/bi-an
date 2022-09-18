import {defineStore} from 'pinia'
import type {SystemVersion} from '@/types/system/system'
import type {Action} from '@/types/system/action'
import versionList from '@/data/version'

import lodash from 'lodash-es'

type State = {
	currentVersionId: number;
	currentVersion: SystemVersion;
	nextVersion: SystemVersion;
	versionList: SystemVersion[];
	ownInvestigationPoints: number;
	totalInvestigationPoints: number;
	darkValue: number;
	actionList: Action[];
}

export const useSystemStore = defineStore('systemStore', {
	state: (): State => ({
		currentVersionId: versionList[0].id,
		currentVersion: lodash.cloneDeep(versionList[0]),
		nextVersion: lodash.cloneDeep(versionList[1]),
		versionList,
		ownInvestigationPoints: 0,
		totalInvestigationPoints: 0,
		darkValue: 0,
		actionList: []
	}),
	actions: {
		versionUpgrade() {
			const targetVersion = lodash.cloneDeep(this.versionList.find(version => version.id === (this.currentVersionId + 1)))
			const nextVersion = lodash.cloneDeep(this.versionList.find(version => version.id === (this.currentVersionId + 2)))
			if (targetVersion) {
				this.currentVersionId = targetVersion.id
				this.currentVersion = targetVersion
				this.currentVersion.hasUpdated = true
			}

			if (nextVersion) {
				this.nextVersion = nextVersion
			}
		},
		addActions(actions: Action[]) {
			this.actionList.push(...actions)
		}
	}
})

