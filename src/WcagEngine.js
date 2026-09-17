import { hexToRgb, linearize, relativeLuminance, contrastRatio } from './color'

/**
 * Represents the WCAG engine.
 */
export class WcagEngine {
  #conformanceLevel

  /**
   * Creates an instance of WcagEngine.
   *
   * @param {object} options - Configuration options.
   * @param {'AA'|'AAA'} options.conformanceLevel - WCAG conformance level.
   */
  constructor({ conformanceLevel = 'AA' } = {}) {
    this.conformanceLevel = conformanceLevel
  }

  /**
   * Gets the current WCAG conformance level.
   *
   * @returns {string} The WCAG conformance level.
   */
  get conformanceLevel() {
    return this.#conformanceLevel
  }

  /**
   * Sets the WCAG conformance level.
   */
  set conformanceLevel(level) {
    if (level !== 'AA' && level !== 'AAA') {
      throw new Error('Conformance level must be AA or AAA')
    }
    this.#conformanceLevel = level
  }

  /**
   * Checks the contrast ratio between two colors against WCAG 2.2 thresholds (1.4.3, 1.4.6).
   *
   * @param {string} foregroundColor - Hex color (e.g. '#fafafa').
   * @param {string} backgroundColor - Hex color (e.g. '#1a1a1a').
   * @param {object} [options] - Optional properties for large-scale text.
   * @param {number} [options.fontSize] - Font size in px.
   * @param {number} [options.fontWeight] - Font weight (e.g. 700).
   * @returns {{ ratio: number, aa: boolean, aaa: boolean, passes: boolean }} Contrast result with ratio and pass/fail per level.
   */
  checkContrast(foregroundColor, backgroundColor, { fontSize, fontWeight } = {}) {
    if (fontSize !== undefined && (typeof fontSize !== 'number' || fontSize <= 0)) {
      throw new Error('fontSize must be a positive number in px.')
    }
    if (fontWeight !== undefined && (typeof fontWeight !== 'number' || fontWeight <= 0)) {
      throw new Error('fontWeight must be a positive number.')
    }

    const fgLuminance = relativeLuminance(linearize(hexToRgb(foregroundColor)))
    const bgLuminance = relativeLuminance(linearize(hexToRgb(backgroundColor)))
    const ratio = contrastRatio(fgLuminance, bgLuminance)

    const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700)
    const aaThreshold = isLargeText ? 3 : 4.5
    const aaaThreshold = isLargeText ? 4.5 : 7

    const aa = ratio >= aaThreshold
    const aaa = ratio >= aaaThreshold

    return { ratio, aa, aaa, passes: this.#passes(aa, aaa) }
  }

  /**
   * Checks the target size of interactive elements against WCAG 2.2 thresholds (2.5.5, 2.5.8).
   *
   * @param {number} width - Element width in CSS pixels.
   * @param {number} height - Element height in CSS pixels.
   * @returns {{ aa: boolean, aaa: boolean, passes: boolean, requiredAa: number, requiredAaa: number }} Pass/fail and required size per level.
   */
  checkTargetSize(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number' || width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive numbers in px.')
    }

    const aa = width >= 24 && height >= 24
    const aaa = width >= 44 && height >= 44

    return { aa, aaa, passes: this.#passes(aa, aaa), requiredAa: 24, requiredAaa: 44 }
  }

  /**
   * Checks if the result passes the configured conformance level.
   *
   * @param {boolean} aa - AA pass result.
   * @param {boolean} aaa - AAA pass result.
   * @returns {boolean} Whether it passes the configured level.
   */
  #passes(aa, aaa) {
    return this.#conformanceLevel === 'AAA' ? aaa : aa
  }
}
