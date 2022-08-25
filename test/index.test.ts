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
