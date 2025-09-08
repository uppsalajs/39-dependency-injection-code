import { isoly } from "isoly"
import type { Locale } from "./index"

export abstract class Abstract {
	abstract format(date: [number, number, number]): string | undefined
	abstract parse(date: string): (number | undefined)[] | undefined
	private static locales: Map<isoly.Locale | "ISO-8601", Locale> = new Map()
	static register(locale: Locale, ...locales: (isoly.Locale | "ISO-8601")[]): void {
		for (const l of locales)
			this.locales.set(l, locale)
	}
	static get(locale: isoly.Locale | "ISO-8601"): Locale | undefined {
		return this.locales.get(locale)
	}
}
