# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-19

### Added

- `WcagEngine` class with configurable conformance level (AA/AAA)
- `checkContrast` method for text contrast checking (WCAG 2.2 1.4.3, 1.4.6)
- Large text support via optional `fontSize` and `fontWeight` parameters
- `checkNonTextContrast` method for UI component contrast checking (WCAG 2.2 1.4.11)
- `checkTargetSize` method for interactive element size checking (WCAG 2.2 2.5.5, 2.5.8)
- `passes` property in check results based on configured conformance level
- `contrastRatio` and `relativeLuminance` exported as standalone utilities
