import { isoly } from "isoly"
import { Locale as _Locale } from "./Locale"

export class Date {
	constructor(public year: number, public month: number, public day: number) {}
	toString(locale: isoly.Locale | "ISO-8601" = "ISO-8601"): string | undefined {
		return Date.Locale.get(locale)?.format([this.year, this.month, this.day])
	}
	static parse(date: string, locale: isoly.Locale | "ISO-8601" = "ISO-8601"): Date | undefined {
		const result: (number | undefined)[] | undefined = Date.Locale.get(locale)?.parse(date)
		return result && result.length == 3 && result.every(n => n != undefined && !isNaN(n) && n >= 0)
			? new Date(result[0]!, result[1]!, result[2]!)
			: undefined
	}
}
export namespace Date {
	export import Locale = _Locale
}
