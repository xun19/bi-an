import type {SystemVersion} from '@/types/system/system'

const versionList: SystemVersion[] = [
	{
		id: 1,
		versionNum: '1.0',
		alias: '初始版本',
		needInvestigationPoints: 0,
		hasUpdated: true
	},
	{
		id: 2,
		versionNum: '1.3',
		alias: '识脸版本',
		needInvestigationPoints: 5,
		hasUpdated: false
	}
]

export default versionList
