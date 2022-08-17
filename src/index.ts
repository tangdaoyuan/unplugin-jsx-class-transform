import { createUnplugin } from 'unplugin'
import type { GeneralOptions } from './types'

export default createUnplugin<GeneralOptions>(() => {
  return {
    name: 'unplugin-starter2',
    transformInclude(id: string) {
      return id.endsWith('.vue')
    },
    transform(_code: string, _id: string) {
      return null
    },
  }
})
