import { isoly } from "isoly"

export class Date {
	constructor(readonly year: number, readonly month: number, readonly day: number) {}
	toString(locale: isoly.Locale | "ISO-8601" = "ISO-8601"): string | undefined {
		let result: string | undefined
		switch (locale) {
			case "en-US":
				result = `${this.month}/${this.day}/${this.year}`
				break
			case "fr-FR":
			case "es-ES":
			case "pt-PT":
				result = `${this.day}/${this.month}/${this.year}`
				break
			case "de-DE":
			case "nl-NL":
				result = `${this.day}.${this.month}.${this.year}`
				break
			case "it-IT":
				result = `${this.day}-${this.month}-${this.year}`
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
		// order [year, month, day]
		let result: (number | undefined)[] | undefined
		switch (locale) {
			case "en-US": {
				const [month, day, year] = date.split("/").map(Number)
				result = [year, month, day]
				break
			}
			case "fr-FR":
			case "es-ES":
			case "pt-PT": {
				result = date.split("/").map(Number).reverse()
				break
			}
			case "de-DE":
			case "nl-NL": {
				result = date.split(".").map(Number).reverse()
				break
			}
			case "it-IT": {
				result = date.split("-").map(Number).reverse()
				break
			}
			case "ISO-8601":
			default: {
				result = date.split("-").map(Number)
				break
			}
		}
		return result && result.length == 3 && result.every((n: number | undefined): n is number => Number.isFinite(n))
			? new Date(result[0]!, result[1]!, result[2]!)
			: undefined
	}
}
