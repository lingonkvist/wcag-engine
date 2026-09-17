import { describe, test, expect } from 'vitest'
import { WcagEngine } from '../src/index.js'

describe('WcagEngine', () => {
  describe('checkContrast', () => {
    const engine = new WcagEngine()

    test('black on white returns maximum contrast', () => {
      const result = engine.checkContrast('#000000', '#ffffff')

      expect(result.ratio).toBeCloseTo(21, 1)
      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(true)
    })

    test('gray on white passes AA but fails AAA', () => {
      const result = engine.checkContrast('#757575', '#ffffff')

      expect(result.ratio).toBeCloseTo(4.6, 1)
      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(false)
    })

    test('large-scale font size passes AA but fails AAA', () => {
      const result = engine.checkContrast('#949494', '#ffffff', { fontSize: 24 })

      expect(result.ratio).toBeCloseTo(3.03, 1)
      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(false)
    })

    test('large-scale font weight passes AA but fails AAA', () => {
      const result = engine.checkContrast('#949494', '#ffffff', { fontSize: 19, fontWeight: 700 })

      expect(result.ratio).toBeCloseTo(3.03, 1)
      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(false)
    })

    test('light gray on white fails AA and AAA', () => {
      const result = engine.checkContrast('#C8C8C8', '#ffffff')

      expect(result.ratio).toBeCloseTo(1.67, 1)
      expect(result.aa).toBe(false)
      expect(result.aaa).toBe(false)
    })

    test('invalid font size throws error', () => {
      expect(() => engine.checkContrast('#949494', '#ffffff', { fontSize: -1 })).toThrow()
    })

    test('invalid font weight throws error', () => {
      expect(() => engine.checkContrast('#949494', '#ffffff', { fontSize: 24, fontWeight: -1 })).toThrow()
    })

    test('passes reflects AA conformance level', () => {
      const engine = new WcagEngine({ conformanceLevel: 'AA' })
      const result = engine.checkContrast('#757575', '#ffffff')
      expect(result.passes).toBe(result.aa)
    })

    test('passes reflects AAA conformance level', () => {
      const engine = new WcagEngine({ conformanceLevel: 'AAA' })
      const result = engine.checkContrast('#757575', '#ffffff')
      expect(result.passes).toBe(result.aaa)
    })
  })
})
