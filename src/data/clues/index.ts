import type {Clue} from '@/types/system/clue'
import discourseClueData from './discourse'
import eventClueData from './event'
import fingerprintClueData from './fingerprint'
import historyClueData from './history'
import personClueData from './person'
import positionClueData from './position'
import othersClueData from './others'

const clues: Clue[] = [
	...discourseClueData,
	...eventClueData,
	...fingerprintClueData,
	...historyClueData,
	...personClueData,
	...positionClueData,
	...othersClueData
]

export default clues
