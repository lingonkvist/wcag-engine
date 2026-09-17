import { describe, test, expect } from 'vitest'
import { hexToRgb, linearize, relativeLuminance, contrastRatio } from '../src/color'


describe('hexToRgb', () => {
  test('converts hex color to RGB values', () => {
    expect(hexToRgb('#1a2b3c')).toEqual([26, 43, 60])
  })

  test('throws on invalid hex format', () => {
    expect(() => hexToRgb('banana')).toThrow()
  })

  test('accepts uppercase letters', () => {
    expect(hexToRgb('#1A2B3C')).toEqual([26, 43, 60])
  })

  test('handles black and white colors', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0])
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
  })
})

describe('linearize', () => {
  test('returns 0 for black', () => {
    expect(linearize([0, 0, 0])).toEqual([0, 0, 0])
  })

  test('returns 1 for white', () => {
    expect(linearize([255, 255, 255])).toEqual([1, 1, 1])
  })

  test('converts mid-range values', () => {
    const result = linearize([128, 128, 128])
    result.forEach(channel => expect(channel).toBeCloseTo(0.216, 2))
  })
})

describe('relativeLuminance', () => {
  test('returns 0 for black', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0)
  })

  test('returns 1 for white', () => {
    expect(relativeLuminance([1, 1, 1])).toBe(1)
  })
})

describe('contrastRatio', () => {
  test('returns 21 for black on white', () => {
    expect(contrastRatio(0, 1)).toBeCloseTo(21, 0)
  })

  test('returns 1 for identical colors', () => {
    expect(contrastRatio(0.5, 0.5)).toBe(1)
  })

  test('returns same ratio regardless of argument order', () => {
    expect(contrastRatio(0, 1)).toBe(contrastRatio(1, 0))
  })
})
