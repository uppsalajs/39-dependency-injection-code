import { isoly } from "isoly"
import { Locale as _Locale } from "./Locale"

export class Date {
	constructor(readonly year: number, readonly month: number, readonly day: number) {}
	toString(locale: isoly.Locale | "ISO-8601" = "ISO-8601"): string | undefined {
		const result: string | undefined = Date.Locale.get(locale)?.toString([this.year, this.month, this.day])
		return result
	}
	toJSON() {
		return this.toString()
	}
	static parse(date: string, locale: isoly.Locale | "ISO-8601" = "ISO-8601"): Date | undefined {
		// order [year, month, day]
		const result: (number | undefined)[] | undefined = Date.Locale.get(locale)?.parse(date)
		return result && result.length == 3 && result.every((n: number | undefined): n is number => Number.isFinite(n))
			? new Date(result[0]!, result[1]!, result[2]!)
			: undefined
	}
}
export namespace Date {
	export import Locale = _Locale
}
