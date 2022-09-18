import versionList from '../version'
import type {Skill} from '@/types/system/skill'
import {SkillType} from '@/types/system/skill'

import lodash from 'lodash-es'

import testIcon from '@/assets/skills/1.jpg'
import testIcon2 from '@/assets/skills/2.jpg'
import testIcon3 from '@/assets/skills/3.jpg'
import searchIcon from '@/assets/skills/search.svg'
import shootIcon from '@/assets/skills/shoot.svg'
import watchIcon from '@/assets/skills/watch.svg'

const totalSkillList: Skill[] = [
	{
		id: 1,
		type: SkillType.action,
		name: '线索提取器',
		description: '能够进行名为【搜查】的行动。系统提供的最基础的能力。将鼠标移动到页面后，指针将变为🔍形状，通过点击鼠标左键即可进行信息的搜寻。若此处存在有用信息，即可将其提取到系统的线索清单里。',
		icon: searchIcon,
		cursor: '',
		actionAlias: '搜查', // 若为action类型
		needVersion: versionList[0],
		hasOwned: true
	},
	{
		id: 2,
		type: SkillType.action,
		name: '监视者射击器',
		description: '能够进行名为【狙击】的行动。',
		icon: shootIcon,
		cursor: '',
		actionAlias: '狙击', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 3,
		type: SkillType.action,
		name: '细节审查仪',
		description: '能够进行名为【监视】的行动。',
		icon: watchIcon,
		cursor: '',
		actionAlias: '监视', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 4,
		type: SkillType.action,
		name: '言语推测仪',
		description: '声场对空气会造成微弱的扭曲，这些是人声的残留，而这些残留会被图像捕捉下来。“言语推测仪”可以通过对图像中空气的扭曲，从而逆向推测出其中人物的言语。',
		icon: '',
		cursor: '',
		actionAlias: '窃听', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 5,
		type: SkillType.action,
		name: '人脸识别器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '识脸', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 6,
		type: SkillType.action,
		name: '指纹提取器',
		description: '图像中会残存模糊的指纹痕迹，通过“指纹提取器”可以将这些痕迹提取并复原，从而推断出指纹的主人。',
		icon: '',
		cursor: '',
		actionAlias: '指纹', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 7,
		type: SkillType.action,
		name: '地理定位器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '定位', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 8,
		type: SkillType.action,
		name: '线索提取器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '星解', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 9,
		type: SkillType.passive,
		name: '评论查看器',
		description: '通过监测用户最多的。。。解锁被幕后方屏蔽的评论',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 10,
		type: SkillType.passive,
		name: '密码解锁器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 11,
		type: SkillType.passive,
		name: '警告器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 12,
		type: SkillType.covert,
		name: '页元素删除器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 13,
		type: SkillType.covert,
		name: '乱码植入器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 14,
		type: SkillType.covert,
		name: '暗码修复仪',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	},
	{
		id: 15,
		type: SkillType.covert,
		name: '页元素移动器',
		description: '',
		icon: '',
		cursor: '',
		actionAlias: '', // 若为action类型
		needVersion: versionList[0],
		hasOwned: false
	}
]

export default totalSkillList
