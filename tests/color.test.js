import { describe, test, expect } from 'vitest'
import { normalizeColor, hexToRgb, parseRgbString, linearize, relativeLuminance, contrastRatio } from '../src/color'

describe('normalizeColor', () => {
  test('passes through valid RGB array', () => {
    expect(normalizeColor([255, 0, 0])).toEqual([255, 0, 0])
  })

  test('converts RGB object to array', () => {
    expect(normalizeColor({ r: 255, g: 0, b: 0 })).toEqual([255, 0, 0])
  })

  test('converts hex string to array', () => {
    expect(normalizeColor('#ff0000')).toEqual([255, 0, 0])
  })

  test('converts rgb string to array', () => {
    expect(normalizeColor('rgb(255, 0, 0)')).toEqual([255, 0, 0])
  })

  test('throws on unsupported format', () => {
    expect(() => normalizeColor(42)).toThrow()
  })

  test('throws on invalid RGB array values', () => {
    expect(() => normalizeColor([999, 0, 0])).toThrow()
  })
})

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

describe('parseRgbString', () => {
  test('parses rgb string to channel values', () => {
    expect(parseRgbString('rgb(255, 0, 0)')).toEqual([255, 0, 0])
  })

  test('handles spaces and no spaces', () => {
    expect(parseRgbString('rgb(255,0,0)')).toEqual([255, 0, 0])
  })

  test('throws on invalid format', () => {
    expect(() => parseRgbString('lingon')).toThrow()
  })

  test('throws on out-of-range values', () => {
    expect(() => parseRgbString('rgb(999, 0, 0)')).toThrow()
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
