import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import { transform } from '@'

describe('works', () => {
  it('basic', async() => {
    const url = new URL('./fixture/basic.jsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'basic')).toMatchInlineSnapshot(`
      "<div class=\\"test\\"></div>
      "
    `)
  })
  it('auto close bracket', async() => {
    const url = new URL('./fixture/auto-close.jsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'auto-close')).toMatchInlineSnapshot(`
      "<div class=\\"test\\" />
      "
    `)
  })
  it('misleading', async() => {
    const url = new URL('./fixture/misleading.jsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'misleading')).toMatchInlineSnapshot(`
      "<div class=\\"test\\">className</div>
      "
    `)
  })
  it('multiple line', async() => {
    const url = new URL('./fixture/multline.jsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'mul-line')).toMatchInlineSnapshot(`
      "<div>
        <div class=\\"test1\\"></div>
        <div class=\\"test2\\"></div>
        <div class=\\"test3\\"></div>
      </div>
      "
    `)
  })
  it('wrap line', async() => {
    const url = new URL('./fixture/wrap.jsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'wrap')).toMatchInlineSnapshot(`
      "<div
        style={{ color: 'red' }}
        class=\\"test\\"
        data={{ test: 1 }}
      >
        <p class=\\"p1\\" />
        className
      </div>
      "
    `)
  })
})

describe('exception fixed', () => {
  it('long tsx/jsx content', async() => {
    const url = new URL('./fixture/long-content.tsx', import.meta.url)
    const content = await fs.readFile(fileURLToPath(url), 'utf8')
    expect(transform(content, 'basic')).toMatchInlineSnapshot(`
      "/* eslint-disable @typescript-eslint/no-unused-vars */
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-nocheck
      import {
        computed,
        defineComponent,
        h,
        ref,
        watch,
      } from '@vue/composition-api'
      import type { IOptionConfigItem } from '@/store/config/state'

      /**
       * notation
       */
      export default defineComponent({
        name: 'ProEnhanceElOption',
        props: {
          currentValue: {
            type: [Boolean, String, Number] as PropType<string | number | boolean>,
          },
          data: {
            type: Object as PropType<IOptionConfigItem>,
            default: () => ({}),
          },
        },
        setup(_props) {
          const visible = ref(true)

          const disable = computed(() => {
            if (_props.currentValue === _props.data?.id && !visible.value)
              return true
            else
              return false
          })

          watch(
            () => _props.data.is_display,
            (nVal) => {
              if (nVal === undefined)
                return

              visible.value = !!nVal
            },
            {
              immediate: true,
            },
          )

          return {
            visible,
            disable,
          }
        },
      })
      "
    `)
  })
})
