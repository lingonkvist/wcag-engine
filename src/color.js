/**
 * Converts a hex color into its RGB channel values.
 *
 * @param {string} hex - Hex color in the format #rrggbb.
 * @returns {number[]} RGB values as [red, green, blue].
 */
export function hexToRgb(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error('Expected a hex color in the format #rrggbb')

  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)

  return [red, green, blue]
}
