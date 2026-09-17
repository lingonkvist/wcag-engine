import { describe, test, expect } from 'vitest'
import { WcagEngine } from '../src/index.js'

describe('WcagEngine', () => {
  describe('checkContrast', () => {
    test('black on white returns maximum contrast', () => {
      const engine = new WcagEngine()
      const result = engine.checkContrast('#000000', '#ffffff')

      expect(result.ratio).toBeCloseTo(21, 0)
      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(true)
    })
  })
})
