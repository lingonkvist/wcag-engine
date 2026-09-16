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
   */
  checkContrast() {
    // TODO: implement contrast check
    throw new Error('Not implemented')
  }
}
