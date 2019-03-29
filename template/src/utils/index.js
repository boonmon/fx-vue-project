import isEmpty from './isEmpty'
import { toBigMoney } from './moneyFormat'
import { formatMoney } from './moneyFormat'
import { formatMillion } from './moneyFormat'
import { toDate } from './toDatetime'
import toDatetime from './toDatetime'
import localStorageUtil from './localStorageUtil'
import sessionStorageUtil from './sessionStorageUtil'
import getPlatformType from './getPlatformType'
import { areaDataHandler } from './handler'

// 统一输出utils下的工具
export default {
    isEmpty,
    toBigMoney,
    formatMoney,
    toDatetime,
    lStore: localStorageUtil, // 重命名localStorageUtil
    sStore: sessionStorageUtil, // 重命名sessionStorageUtil
    getPlatformType,
    toDate
}