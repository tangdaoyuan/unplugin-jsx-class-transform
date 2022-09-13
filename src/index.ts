import { createUnplugin } from 'unplugin'
import type { GeneralOptions } from './types'

export function transform(_code: string, _id: string) {
  return _code.replace(/(?<=\<(.*[\n]*)*\s+)className(?=\=[\"\{].*[\"\}][^<]*\>)/mg, 'class')
}

export default createUnplugin<GeneralOptions>(() => {
  return {
    enforce: 'pre',
    name: 'unplugin-jsx-class-transform',
    transformInclude(id: string) {
      return id.endsWith('.tsx') || id.endsWith('.jsx')
    },
    transform(_code: string, _id: string) {
      return transform(_code, _id)
    },
  }
})
