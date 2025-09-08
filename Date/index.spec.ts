import { library } from "../index"

describe("library.Date", () => {
	it.each([
		[2023, 1, 1, "2023-01-01"],
		[2023, 12, 31, "2023-12-31"],
		[2000, 2, 29, "2000-02-29"],
		[1999, 9, 9, "1999-09-09"],
		[2024, 6, 15, "2024-06-15"],
		[2023, 1, 5, "2023-01-05"], // single digit padding
		[2023, 11, 25, "2023-11-25"], // double digit no padding
		[2020, 2, 29, "2020-02-29"], // leap year date
		[0, 1, 1, "0000-01-01"], // edge case
		[10000, 12, 31, "10000-12-31"], // edge case
	])("toString(%d, %d, %d) === %s", (year, month, day, expected) => {
		const date = new library.Date(year, month, day)
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
		[2023, 6, 15], // property access test case
	])("constructor values (%d, %d, %d)", (year, month, day) => {
		const date = new library.Date(year, month, day)
		expect(date.year).toBe(year)
		expect(date.month).toBe(month)
		expect(date.day).toBe(day)
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
		expect(new library.Date(2023, 6, 15).toString(locale)).toBe(expected)
	)
	it("toString with unsupported locale", () =>
		expect(new library.Date(2023, 6, 15).toString("xx-XX" as any)).toBe(undefined))
	it.each([
		["2023-06-15", "ISO-8601", 2023, 6, 15],
		["2023-01-01", "ISO-8601", 2023, 1, 1],
		["2000-12-31", "ISO-8601", 2000, 12, 31],
	])("parse('%s', '%s') === Date(%d, %d, %d)", (dateString, locale, year, month, day) => {
		const parsed = library.Date.parse(dateString, locale as any)
		expect(parsed).toBeDefined()
		expect(parsed!.year).toBe(year)
		expect(parsed!.month).toBe(month)
		expect(parsed!.day).toBe(day)
	})
	it.each([
		["2023-06-15", "sv-SE"],
		["2023-06-15", "fi-FI"],
		["2023-06-15", "nb-NO"],
		["2023-06-15", "da-DK"],
		["2023-06-15", "is-IS"],
		["06/15/2023", "en-US"],
		["15/06/2023", "en-GB"],
		["15/06/2023", "en-IE"],
		["15/06/2023", "fr-FR"],
		["15/06/2023", "es-ES"],
		["15/06/2023", "it-IT"],
		["15/06/2023", "pt-PT"],
		["15/06/2023", "pt-BR"],
		["15/06/2023", "ro-RO"],
		["15/06/2023", "hr-HR"],
		["15/06/2023", "bg-BG"],
		["15/06/2023", "sl-SI"],
		["15/06/2023", "sk-SK"],
		["15/06/2023", "mt-MT"],
		["15/06/2023", "el-GR"],
		["15.06.2023", "de-DE"],
		["15.06.2023", "de-AT"],
		["15.06.2023", "de-CH"],
		["15.06.2023", "ru-RU"],
		["15.06.2023", "cs-CZ"],
		["15.06.2023", "hu-HU"],
		["15.06.2023", "et-EE"],
		["15.06.2023", "lv-LV"],
		["15.06.2023", "lt-LT"],
		["15.06.2023", "fr-BE"],
		["15.06.2023", "fr-CH"],
		["15.06.2023", "pl-PL"],
		["15-06-2023", "nl-NL"],
		["15-06-2023", "nl-BE"],
		["2023年06月15日", "ja-JP"],
		["2023年06月15日", "zh-CN"],
		["2023년 06월 15일", "ko-KR"],
	] as const)("parse('%s', '%s')", (date, locale) =>
		expect(library.Date.parse(date, locale)?.toString("ISO-8601")).toBe("2023-06-15")
	)
	it("parse with default locale", () => {
		const parsed = library.Date.parse("2023-06-15")
		expect(parsed).toBeDefined()
		expect(parsed!.year).toBe(2023)
		expect(parsed!.month).toBe(6)
		expect(parsed!.day).toBe(15)
	})
	it.each([
		["invalid", "ISO-8601"],
		["abc-def-ghi", "ISO-8601"],
		["2023-06-15", "xx-XX"],
		["15.06.2023", "en-GB"],
		["2023-06", "ISO-8601"],
		["2023年06月15", "ja-JP"],
		["2023년06월15", "ko-KR"],
	] as const)("parse returns undefined for %s", (dateString, locale) =>
		expect(library.Date.parse(dateString, locale as any)).toBeUndefined()
	)
})
