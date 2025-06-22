import apple from './apple.json' assert { type: 'json' }
import amd from './amd.json' assert { type: 'json' }
import intel from './intel.json' assert { type: 'json' }
import snapdragon from './snapdragon.json' assert { type: 'json' }
import type { CpuModel } from './types'

const models = {
  'Apple M1': apple,
  'AMD Ryzen 9': amd,
  'Intel Core i9': intel,
  'Snapdragon X Elite': snapdragon,
} as Record<string, CpuModel>

export default models
