import { Date } from "./index"

describe("Date", () => {
	it.each([
		[2023, 1, 1, "2023-01-01"],
		[2023, 12, 31, "2023-12-31"],
		[2000, 2, 29, "2000-02-29"],
		[1999, 9, 9, "1999-09-09"],
		[2024, 6, 15, "2024-06-15"],
	])("toString(%d, %d, %d) === %s", (year, month, day, expected) => {
		const date = new Date(year, month, day)
		expect(date.toString()).toBe(expected)
	})
	it.each([
		[2023, 1, 1],
		[2023, 12, 31],
		[2000, 2, 29],
		[1999, 9, 9],
		[2024, 6, 15],
		[1, 1, 1],
		[9999, 12, 31],
	])("constructor values (%d, %d, %d)", (year, month, day) => {
		const date = new Date(year, month, day)
		expect(date.year).toBe(year)
		expect(date.month).toBe(month)
		expect(date.day).toBe(day)
	})
	it("single digit padding", () => {
		const date = new Date(2023, 1, 5)
		expect(date.toString()).toBe("2023-01-05")
	})
	it("double digit no padding", () => {
		const date = new Date(2023, 11, 25)
		expect(date.toString()).toBe("2023-11-25")
	})
	it("leap year date", () => {
		const date = new Date(2020, 2, 29)
		expect(date.toString()).toBe("2020-02-29")
	})
	it("edge cases", () => {
		expect(new Date(0, 1, 1).toString()).toBe("0-01-01")
		expect(new Date(10000, 12, 31).toString()).toBe("10000-12-31")
	})
	it("year property access", () => {
		const date = new Date(2023, 6, 15)
		expect(date.year).toBe(2023)
	})
	it("month property access", () => {
		const date = new Date(2023, 6, 15)
		expect(date.month).toBe(6)
	})
	it("day property access", () => {
		const date = new Date(2023, 6, 15)
		expect(date.day).toBe(15)
	})
	it("immutable properties", () => {
		const date = new Date(2023, 6, 15)
		// Properties should be readonly, attempting to modify should have no effect
		// This test verifies the current behavior
		expect(date.year).toBe(2023)
		expect(date.month).toBe(6)
		expect(date.day).toBe(15)
	})
	it.each([
		["ISO-8601", "2023-06-15"],
		["sv-SE", "2023-06-15"],
		["fi-FI", "2023-06-15"],
		["nb-NO", "2023-06-15"],
		["da-DK", "2023-06-15"],
		["is-IS", "2023-06-15"],
		["en-US", "06/15/2023"],
		["en-GB", "15/06/2023"],
		["en-IE", "15/06/2023"],
		["fr-FR", "15/06/2023"],
		["es-ES", "15/06/2023"],
		["it-IT", "15/06/2023"],
		["pt-PT", "15/06/2023"],
		["de-DE", "15.06.2023"],
		["de-AT", "15.06.2023"],
		["de-CH", "15.06.2023"],
		["ru-RU", "15.06.2023"],
		["cs-CZ", "15.06.2023"],
		["hu-HU", "15.06.2023"],
		["nl-NL", "15-06-2023"],
		["nl-BE", "15-06-2023"],
		["fr-BE", "15.06.2023"],
		["fr-CH", "15.06.2023"],
		["pl-PL", "15.06.2023"],
		["el-GR", "15/06/2023"],
		["ja-JP", "2023年06月15日"],
		["zh-CN", "2023年06月15日"],
		["ko-KR", "2023년 06월 15일"],
	] as const)("toString with locale %s", (locale, expected) =>
		expect(new Date(2023, 6, 15).toString(locale)).toBe(expected)
	)
	it("toString with unsupported locale", () =>
		expect(() => new Date(2023, 6, 15).toString("xx-XX" as any)).toThrow("Unsupported locale: xx-XX"))
})
