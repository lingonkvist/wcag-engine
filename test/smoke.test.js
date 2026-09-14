import { describe, it, expect } from 'vitest'
import { version } from '../src/index.js'

describe('module loads', () => {
  it('exports a version string', () => {
    expect(version).toBe('0.0.1')
  })
})
