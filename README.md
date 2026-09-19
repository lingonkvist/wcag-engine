# wcag-engine

> A WCAG 2.2 rules engine for design values.

wcag-engine checks design values (colors, sizes) against WCAG 2.2 success
criteria and returns pass/fail results. It doesn't care where the values
come from, and any tool can build on top of it: Tailwind, JSX, a design
tokens JSON, or just plain ol' CSS.

## Installation

Requires Node.js 24 or later.

```bash
npm install lingonkvist/wcag-engine
```

## Usage

```js
import { WcagEngine } from 'wcag-engine'

const engine = new WcagEngine({ conformanceLevel: 'AA' })

// Text contrast (1.4.3, 1.4.6)
const contrast = engine.checkContrast('#1a1a2e', '#ffffff')
// { ratio: 17.06, aa: true, aaa: true, passes: true }

// Large text uses lower thresholds
const large = engine.checkContrast('#949494', '#ffffff', { fontSize: 24 })
// { ratio: 3.03, aa: true, aaa: false, passes: true }

// Non-text contrast for UI components (1.4.11)
const nonText = engine.checkNonTextContrast('#333333', '#ffffff')
// { ratio: 12.63, aa: true, passes: true }

// Target size for interactive elements (2.5.5, 2.5.8)
const size = engine.checkTargetSize(44, 44)
// { aa: true, aaa: true, passes: true, requiredAa: 24, requiredAaa: 44 }
```

### Standalone utilities

```js
import { contrastRatio, relativeLuminance } from 'wcag-engine'

const luminance = relativeLuminance([0.2, 0.4, 0.6])
// 0.37
const ratio = contrastRatio(0.05, 0.95)
// 10
```

## WCAG criteria covered

- 1.4.3 Contrast (Minimum) - AA
- 1.4.6 Contrast (Enhanced) - AAA
- 1.4.11 Non-text Contrast - AA
- 2.5.5 Target Size (Enhanced) - AAA
- 2.5.8 Target Size (Minimum) - AA

## Testing

```bash
npm test
```

## Contributing

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/lingonkvist/wcag-engine/issues).

## License

MIT  
See [LICENSE](./LICENSE).
