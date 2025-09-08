# Coding Guidelines

This document outlines sensible coding guidelines derived from the [utily/isoly](https://github.com/utily/isoly) repository, applicable for both human developers and AI assistants (Copilots).

## Project Structure & Organization

### Module Organization

- **One concept per directory**: Each major concept (Date, Currency, Address) gets its own directory
- **Nested sub-concepts**: Related sub-concepts live in subdirectories (Date/Day, Date/Month, Date/Year)
- **Consistent file naming**: Each module has an `index.ts` and `index.spec.ts`
- **Barrel exports**: Main `index.ts` imports all modules and re-exports them through a namespace

### File Structure Pattern

```
ModuleName/
├── index.ts           # Main module implementation
├── index.spec.ts      # Comprehensive tests
├── SubConcept/        # Sub-modules when needed
│   ├── index.ts
│   └── index.spec.ts
└── data-files.ts      # Static data (values, decimals, etc.)
```

### Namespace Pattern

```typescript
export type ModuleName = string | number | (typeof ModuleName.values)[number]

export namespace ModuleName {
	export import SubModule = _SubModule
	export const { type, is, flawed } = isly.string<ModuleName>(/* validation */).rename("isoly.ModuleName").bind()

	// Functions here
}
```

## TypeScript Guidelines

### Type Definitions

- **Always use namespaces**: Every exported type must have a corresponding namespace, even if empty
- **Triple export pattern**: For all exported types, provide `type`, `is`, and `flawed` definitions using isly
- **Type validation**: Use isly library for runtime type checking and validation
- **Descriptive type names**: Use full words, avoid abbreviations except "UI", "Id", "max", "min"

### Type Safety

- **Strict TypeScript**: Use strictest possible TypeScript configuration
- **No implicit any**: All types must be explicitly defined
- **Null safety**: Enable `strictNullChecks` and `noUncheckedIndexedAccess`
- **Function overloads**: Use function overloads for different parameter combinations

## Code Style & Formatting

### Function Design

- **Single return point**: Functions should only return in one place
- **Result variable**: Use the name `result` for what the function returns, even when modified on the last line
- **Pure functions**: Prefer pure functions with no side effects
- **Expressions over statements**: Prefer expressions over statements where possible

### Naming Conventions

- **No abbreviations**: Never use abbreviations except "UI", "Id", "max", "min"
- **Descriptive names**: Use descriptive variable and function names
- **Single word identifiers**: Prefer single word identifier names
- **Short single letters**: Only use single letter identifiers if usage is kept within a maximum of 3 lines

### Code Organization

- **Fewer lines over shorter lines**: Prefer fewer lines of code over shorter lines
- **No unnecessary braces**: Never use unnecessary braces in control structures
- **Lambda functions**: Don't use braces in lambda functions when not required
- **Type system reliance**: Rely on type system and only use `===` and `!==` when strictly necessary

## Import/Export Patterns

- **Reexport**: Use underscore prefix when importing for later export

### Import Strategy

```typescript
// Internal imports with underscore prefix
import { SubModule as _SubModule } from "./SubModule"
import { data as _data } from "./data"

// Re-export through namespace
export namespace MainModule {
	export import SubModule = _SubModule
	export const data = _data
}
```

### Main Index Pattern

```typescript
// Import all modules with underscore prefix
import { Date as _Date } from "./Date"
import { Currency as _Currency } from "./Currency"

// Export through main namespace
export namespace isoly {
	export import Date = _Date
	export import Currency = _Currency
}
```

## Testing Guidelines

### Test Structure

- **Co-located tests**: Test files live next to implementation files as `*.spec.ts`
- **Import from index**: Always import the top-level export: `import { isoly } from "../index"`
- **Comprehensive coverage**: Test all public functions and edge cases
- **Parameterized tests**: Prefer using `it.each` for multiple test cases

### Test Naming

- **Short descriptions**: Make test descriptions short
- **Function names**: Use function names and single words describing the test
- **Descriptive cases**: Each test case should clearly describe what it's testing

### Test Examples

```typescript
import { isoly } from "../index"

describe("Date", () => {
	it("undefined", () => expect(isoly.Date.is(undefined)).toEqual(false))

	it.each([
		["1999-12-31", true],
		["2000-02-29", true],
		["1999-02-29", false],
	])("is %s", (date, expected) => expect(isoly.Date.is(date)).toBe(expected))
})
```

## Documentation & Comments

### Code Documentation

- **Minimal comments**: Code should be self-documenting through good naming
- **Type descriptions**: Use isly's `.describe()` for type documentation
- **@deprecated tags**: Mark deprecated functionality clearly

## Performance & Best Practices

## AI Assistant (Copilot) Specific Guidelines

### Code Generation

- **Follow project patterns**: Always follow the established patterns in the codebase
- **Use existing utilities**: Leverage existing utility functions and types
- **Consistent style**: Maintain consistency with existing code style
- **No breaking changes**: Don't suggest code that breaks existing linting rules

### Type Safety

- **Always provide types**: Never generate untyped code
- **Use validation**: Always include proper type validation with isly
- **Follow namespace pattern**: Always wrap types in namespaces with the triple export pattern

### Testing

- **Generate tests**: Always generate corresponding tests for new functions
- **Use it.each**: Prefer parameterized tests with `it.each`
- **Comprehensive coverage**: Cover edge cases and error conditions
- **Import correctly**: Always import from the package index file

## Configuration Standards

### TypeScript Configuration

- Use modern TypeScript with strict settings
- Extend from `@tsconfig/node20` and `@tsconfig/strictest`
- Enable all strict type checking options
- Use ESNext modules for modern JavaScript features

### Build & Development

- **ESM first**: Prefer ES modules over CommonJS
- **Single build target**: Focus on modern environments
- **Type declarations**: Always generate type declaration files
- **Source maps**: Include source maps for debugging

### Linting & Formatting

- Use ESLint with TypeScript support
- Use Prettier for consistent formatting
- Configure import sorting for clean imports
- Enforce consistent code style across the project

## Conclusion

These guidelines prioritize:

1. **Type safety** through strict TypeScript and runtime validation
2. **Consistency** through established patterns and naming conventions
3. **Maintainability** through clear structure and comprehensive testing
4. **Developer experience** through good tooling and documentation

Following these guidelines ensures code that is reliable, maintainable, and consistent with modern TypeScript best practices as demonstrated in the utily/isoly repository.
