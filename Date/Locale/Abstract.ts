import { isoly } from "isoly"

export abstract class Abstract {
	abstract toString(date: [number, number, number]): string | undefined
	abstract parse(date: string): (number | undefined)[] | undefined
	private static readonly locales: Map<isoly.Locale | "ISO-8601", Abstract> = new Map()
	static register(handler: Abstract, ...locales: (isoly.Locale | "ISO-8601")[]) {
		for (const locale of locales) {
			Abstract.locales.set(locale, handler)
		}
	}
	static get(locale: isoly.Locale | "ISO-8601"): Abstract | undefined {
		return Abstract.locales.get(locale)
	}
}
