import { describe, test, expect } from 'vitest'
import { hexToRgb } from '../src/color'


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
