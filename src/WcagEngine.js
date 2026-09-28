import { normalizeColor, linearize, relativeLuminance, contrastRatio } from './color.js'

/**
 * A color value. Supported formats: hex string ('#rrggbb'), RGB string ('rgb(r, g, b)'), array ([r, g, b]), or object ({r, g, b}).
 *
 * @typedef {string|number[]|{r: number, g: number, b: number}} Color
 */

const CONTRAST_THRESHOLDS = {
  aa: { normal: 4.5, large: 3 },
  aaa: { normal: 7, large: 4.5 },
  nonText: 3,
}

const TARGET_SIZE = {
  aa: 24,
  aaa: 44,
}

const LARGE_TEXT = {
  minSize: 24,
  minBoldSize: 18.66,
  minWeight: 700,
}

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
   * @returns {'AA'|'AAA'} The WCAG conformance level.
   */
  get conformanceLevel() {
    return this.#conformanceLevel
  }

  /**
   * Sets the WCAG conformance level.
   *
   * @param {'AA'|'AAA'} level - Desired conformance level.
   * @throws {Error} If level is not AA or AAA.
   */
  set conformanceLevel(level) {
    if (level !== 'AA' && level !== 'AAA') {
      throw new Error('Conformance level must be AA or AAA')
    }
    this.#conformanceLevel = level
  }

  /**
   * Checks text contrast against WCAG 2.2 thresholds (1.4.3, 1.4.6).
   * Supports large text detection via optional font properties.
   *
   * @param {Color} foregroundColor - Foreground color.
   * @param {Color} backgroundColor - Background color.
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

    const ratio = this.#computeRatio(foregroundColor, backgroundColor)

    const isLargeText = this.#isLargeText(fontSize, fontWeight)

    const aaThreshold = isLargeText ? CONTRAST_THRESHOLDS.aa.large : CONTRAST_THRESHOLDS.aa.normal
    const aaaThreshold = isLargeText ? CONTRAST_THRESHOLDS.aaa.large : CONTRAST_THRESHOLDS.aaa.normal

    const aa = ratio >= aaThreshold
    const aaa = ratio >= aaaThreshold

    return { ratio, aa, aaa, passes: this.#passes(aa, aaa) }
  }

  /**
   * Checks non-text contrast for UI components and graphical objects against WCAG 2.2 (1.4.11).
   *
   * @param {Color} foregroundColor - Foreground color.
   * @param {Color} backgroundColor - Background color.
   * @returns {{ ratio: number, aa: boolean, passes: boolean }} Contrast result with ratio and pass/fail for AA.
   */
  checkNonTextContrast(foregroundColor, backgroundColor) {
    const ratio = this.#computeRatio(foregroundColor, backgroundColor)

    const aa = ratio >= CONTRAST_THRESHOLDS.nonText

    return { ratio, aa, passes: this.#passes(aa, aa) }
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

    const aa = width >= TARGET_SIZE.aa && height >= TARGET_SIZE.aa
    const aaa = width >= TARGET_SIZE.aaa && height >= TARGET_SIZE.aaa

    return { aa, aaa, passes: this.#passes(aa, aaa), requiredAa: TARGET_SIZE.aa, requiredAaa: TARGET_SIZE.aaa }
  }

  #passes(aa, aaa) {
    return this.#conformanceLevel === 'AAA' ? aaa : aa
  }

  #isLargeText(fontSize, fontWeight) {
    return fontSize >= LARGE_TEXT.minSize || (fontSize >= LARGE_TEXT.minBoldSize && fontWeight >= LARGE_TEXT.minWeight)
  }

  #computeRatio(color1, color2) {
    const l1 = relativeLuminance(linearize(normalizeColor(color1)))
    const l2 = relativeLuminance(linearize(normalizeColor(color2)))
    return contrastRatio(l1, l2)
  }
}
