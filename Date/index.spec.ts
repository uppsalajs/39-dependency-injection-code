import { Date } from "./index"

describe("Date", () => {
	describe("constructor", () => {
		it("should create a date with the provided year, month, and day", () => {
			const date = new Date(2025, 9, 8)
			expect(date.year).toEqual(2025)
			expect(date.month).toEqual(9)
			expect(date.day).toEqual(8)
		})
	})

	describe("toString", () => {
		it.each([
			{ date: new Date(2025, 9, 8), expected: "2025-09-08", description: "standard date" },
			{ date: new Date(2025, 1, 5), expected: "2025-01-05", description: "with single-digit month and day" },
		])("should format $description correctly", ({ date, expected }) => {
			expect(date.toString()).toEqual(expected)
		})

		it.each([
			{ date: new Date(2025, 9, 8), locale: "en-US", expected: "9/8/2025" },
			{ date: new Date(2025, 9, 8), locale: "sv-SE", expected: "2025-09-08" },
			{ date: new Date(2025, 9, 8), locale: "ISO-8601", expected: "2025-09-08" },
		] as const)("should format date according to $locale locale", ({ date, locale, expected }) =>
			expect(date.toString(locale)).toEqual(expected)
		)
	})
	it.each([new Date(2025, 9, 8), new Date(2025, 1, 5)])("toJSON(%s)", value =>
		expect(value.toJSON()).toEqual(value.toString())
	)

	describe("parse", () => {
		it.each([
			{ input: "2025-09-08", locale: "ISO-8601" as const, year: 2025, month: 9, day: 8 },
			{ input: "2025-1-5", locale: "ISO-8601" as const, year: 2025, month: 1, day: 5 },
			{ input: "9/8/2025", locale: "en-US" as const, year: 2025, month: 9, day: 8 },
		])("should parse $input with $locale locale", ({ input, locale, year, month, day }) => {
			const date = Date.parse(input, locale)
			expect(date).toBeInstanceOf(Date)
			expect(date?.year).toEqual(year)
			expect(date?.month).toEqual(month)
			expect(date?.day).toEqual(day)
		})
	})
})
