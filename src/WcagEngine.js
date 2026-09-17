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
   * Gets the WCAG current conformance level setting.
   *
   * @returns {number} The WCAG conformance level.
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
   * Checks the contrast ratio between two colors against WCAG 2.2 thresholds.
   *
   * @param {string} foregroundColor - Hex color (e.g. '#fafafa').
   * @param {string} backgroundColor - Hex color (e.g. '#1a1a1a').
   * @param {object} [options] - Optional properties for large-scale text.
   * @param {number} [options.fontSize] - Font size in px.
   * @param {number} [options.fontWeight] - Font weight (e.g. 700).
   * @returns {{ ratio: number, aa: boolean, aaa: boolean }} Contrast result with ratio and pass/fail per level.
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

    return { ratio, aa: ratio >= aaThreshold, aaa: ratio >= aaaThreshold }
  }
}
