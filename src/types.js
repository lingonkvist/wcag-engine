/**
 * @typedef {object} ContrastResult
 * @property {number} ratio - Contrast ratio between the two colors.
 * @property {boolean} aa - Whether the ratio meets AA threshold.
 * @property {boolean} aaa - Whether the ratio meets AAA threshold.
 * @property {boolean} passes - Whether the ratio meets the configured conformance level.
 */

/**
 * @typedef {object} NonTextContrastResult
 * @property {number} ratio - Contrast ratio between the two colors.
 * @property {boolean} aa - Whether the ratio meets the 3:1 AA threshold.
 * @property {boolean} passes - Whether the ratio meets the configured conformance level.
 */

/**
 * @typedef {object} TargetSizeResult
 * @property {boolean} aa - Whether the element meets the 24px AA minimum.
 * @property {boolean} aaa - Whether the element meets the 44px AAA minimum.
 * @property {boolean} passes - Whether the element meets the configured conformance level.
 * @property {number} requiredAa - Required size in px for AA.
 * @property {number} requiredAaa - Required size in px for AAA.
 */

/**
 * A color value. Supported formats: hex string ('#rrggbb'), RGB string ('rgb(r, g, b)'), array ([r, g, b]), or object ({r, g, b}).
 *
 * @typedef {string|number[]|{r: number, g: number, b: number}} Color
 */
