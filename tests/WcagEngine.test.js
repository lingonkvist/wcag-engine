import { describe, test, expect } from 'vitest'
import { WcagEngine } from '../src/index.js'

describe('WcagEngine', () => {
  const engine = new WcagEngine()

  describe('checkContrast', () => {
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
  })

  describe('checkTargetSize', () => {
    test('passes both AA and AAA at 44x44px', () => {
      const result = engine.checkTargetSize(44, 44)

      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(true)
    })

    test('passes AA but fails AAA at 30x30px', () => {
      const result = engine.checkTargetSize(30, 30)

      expect(result.aa).toBe(true)
      expect(result.aaa).toBe(false)
    })

    test('fails both AA and AAA at 20x20px', () => {
      const result = engine.checkTargetSize(20, 20)

      expect(result.aa).toBe(false)
      expect(result.aaa).toBe(false)
    })

    test('fails when only one dimension meets the threshold', () => {
      const result = engine.checkTargetSize(44, 20)

      expect(result.aa).toBe(false)
      expect(result.aaa).toBe(false)
    })

    test('throws on invalid dimensions', () => {
      expect(() => engine.checkTargetSize(-1, -1)).toThrow()
    })
  })

  describe('conformanceLevel', () => {
    test('defaults to AA', () => {
      const engine = new WcagEngine()
      expect(engine.conformanceLevel).toBe('AA')
    })

    test('throws on invalid conformance level', () => {
      expect(() => new WcagEngine({ conformanceLevel: 'B' })).toThrow()
    })

    test('passes reflects AA conformance level', () => {
      const engine = new WcagEngine({ conformanceLevel: 'AA' })
      const contrastResult = engine.checkContrast('#757575', '#ffffff')
      const targetSizeResult = engine.checkTargetSize(30, 30)
      expect(contrastResult.passes).toBe(contrastResult.aa)
      expect(targetSizeResult.passes).toBe(targetSizeResult.aa)
    })

    test('passes reflects AAA conformance level', () => {
      const engine = new WcagEngine({ conformanceLevel: 'AAA' })
      const contrastResult = engine.checkContrast('#757575', '#ffffff')
      const targetSizeResult = engine.checkTargetSize(30, 30)
      expect(contrastResult.passes).toBe(contrastResult.aaa)
      expect(targetSizeResult.passes).toBe(targetSizeResult.aaa)
    })
  })
})
