// Formulas from WCAG 2.2: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio.

/**
 * Converts a hex color into its RGB channel values.
 *
 * @param {string} hex - Hex color in the format #rrggbb.
 * @returns {number[]} RGB values as [red, green, blue].
 */
export function hexToRgb(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error('Expected a hex color in the format #rrggbb')

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return [r, g, b]
}

/**
 * Converts sRGB channel values into linear light values.
 *
 * @param {number[]} rgb - RGB values, each 0-255.
 * @returns {number[]} Linearized values, each 0-1.
 */
export function linearize(rgb) {
  return rgb.map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
}

/**
 * Calculates the relative luminance of a color from its linearized RGB values.
 *
 * @param {number[]} linearRgb - Linearized RGB values, each 0-1.
 * @returns {number} Relative luminance, 0 (black) to 1 (white).
 */
export function relativeLuminance(linearRgb) {
  const [r, g, b] = linearRgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculates the contrast ratio between two relative luminance values.
 *
 * @param {number} l1 - Relative luminance of the first color, 0-1.
 * @param {number} l2 - Relative luminance of the second color, 0-1.
 * @returns {number} Contrast ratio, 1 (identical) to 21 (black on white).
 */
export function contrastRatio(l1, l2) {
  // Sort so argument order doesn't matter.
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}
