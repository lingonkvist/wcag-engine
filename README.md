# wcag-engine

> A WCAG 2.2 rules engine for design values.

wcag-engine checks design values (colors, sizes) against WCAG 2.2 success
criteria and returns pass/fail results. Feed it a single color pair and it
returns the contrast ratio and whether it passes AA. Feed it a whole design
system and it returns a report of every violation.

Most WCAG tooling either audits a rendered DOM (axe-core, AccessLint) or is
locked to a specific tool (tailwind-a11y). wcag-engine sits underneath. It
doesn't care where the values come from, and any tool can build on top of
it: Tailwind, JSX, a design tokens JSON, or just plain ol' CSS.

## Status

Work in progress. Coursework for [1DV610 Introduktion till mjukvarukvalitet](https://coursepress.lnu.se/kurs/introduktion-till-mjukvarukvalitet) at Linnéuniversitetet.

## Installation

(TBD once published)

## Usage

(TBD)

## License

MIT  
See [LICENSE](./LICENSE).
