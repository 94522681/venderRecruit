/**
 * 2021-01-08
 * hostApi
 */
import config from '../../config/index'
import UTA_HOST from './uta_hosts'

const hostApi = {
  DEV: {},
  DEV2: {},
  Daily: {},
  UAT: UTA_HOST,
  UAT1: {},
  UAT2: {},
  UAT3: {},
  UAT4: {},
  PRO: {},
  GRAY: {}
}[config.env]

export default hostApi
