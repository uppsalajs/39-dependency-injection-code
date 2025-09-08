import { isoly } from "isoly"

export class Date {
	constructor(readonly year: number, readonly month: number, readonly day: number) {}
	toString(locale: isoly.Locale | "ISO-8601" = "ISO-8601"): string | undefined {
		let result: string | undefined
		switch (locale) {
			case "en-US":
				result = `${this.month}/${this.day}/${this.year}`
				break
			case "sv-SE":
			case "ISO-8601":
			default:
				result = `${this.year}-${String(this.month).padStart(2, "0")}-${String(this.day).padStart(2, "0")}`
		}
		return result
	}
	toJSON() {
		return this.toString()
	}
	static parse(date: string, locale: isoly.Locale | "ISO-8601" = "ISO-8601"): Date | undefined {
		let year: number | undefined, month: number | undefined, day: number | undefined
		switch (locale) {
			case "en-US": {
				const parts = date.split("/")
				if (parts.length === 3) {
					month = Number(parts[0])
					day = Number(parts[1])
					year = Number(parts[2])
				}
				break
			}
			case "ISO-8601":
			default: {
				const parts = date.split("-")
				if (parts.length === 3) {
					year = Number(parts[0])
					month = Number(parts[1])
					day = Number(parts[2])
				}
				break
			}
		}
		return year && month && day ? new Date(year, month, day) : undefined
	}
}
