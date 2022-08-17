import { createUnplugin } from 'unplugin'
import type { GeneralOptions } from './types'

export default createUnplugin<GeneralOptions>(() => {
  return {
    name: 'unplugin-jsx-class-transform',
    transformInclude(id: string) {
      return id.endsWith('.tsx') || id.endsWith('.jsx')
    },
    transform(_code: string, _id: string) {
      return _code.replace(/className/g, 'class')
    },
  }
})
