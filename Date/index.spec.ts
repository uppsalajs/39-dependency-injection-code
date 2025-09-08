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
		it("should return the date in YYYY-MM-DD format", () => {
			const date = new Date(2025, 9, 8)
			expect(date.toString()).toEqual("2025-09-08")
		})

		it("should pad single-digit month and day with a leading zero", () => {
			const date = new Date(2025, 1, 5)
			expect(date.toString()).toEqual("2025-01-05")
		})
	})

	it.each([new Date(2025, 9, 8), new Date(2025, 1, 5)])("toJSON(%s)", value =>
		expect(value.toJSON()).toEqual(value.toString())
	)

	describe("parse", () => {
		it("should create a Date object from a string in YYYY-MM-DD format", () => {
			const date = Date.parse("2025-09-08")
			expect(date).toBeInstanceOf(Date)
			expect(date?.year).toEqual(2025)
			expect(date?.month).toEqual(9)
			expect(date?.day).toEqual(8)
		})

		it("should handle single-digit month and day in the input string", () => {
			const date = Date.parse("2025-1-5")
			expect(date).toBeInstanceOf(Date)
			expect(date?.year).toEqual(2025)
			expect(date?.month).toEqual(1)
			expect(date?.day).toEqual(5)
		})
	})
})
