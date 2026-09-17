import { hexToRgb, linearize, relativeLuminance, contrastRatio } from "./color"

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
   * Checks the contrast ratio between two colors against WCAG 2.2 thresholds.
   *
   * @param {string} foregroundColor - Hex color (e.g. '#fafafa').
   * @param {string} backgroundColor - Hex color (e.g. '#1a1a1a').
   * @returns {{ ratio: number, aa: boolean, aaa: boolean }} Contrast result with ratio and pass/fail per level.
   */
  checkContrast(foregroundColor, backgroundColor) {
    const fgLuminance = relativeLuminance(linearize(hexToRgb(foregroundColor)))
    const bgLuminance = relativeLuminance(linearize(hexToRgb(backgroundColor)))
    const ratio = contrastRatio(fgLuminance, bgLuminance)

    return { ratio, aa: ratio >= 4.5, aaa: ratio >= 7 }
  }
}
