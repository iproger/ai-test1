import apple from './apple.json'
import amd from './amd.json'
import intel from './intel.json'
import snapdragon from './snapdragon.json'
import type { CpuModel } from './types'

const models = {
  'Apple M1': apple,
  'AMD Ryzen 9': amd,
  'Intel Core i9': intel,
  'Snapdragon X Elite': snapdragon,
} as Record<string, CpuModel>

export default models
