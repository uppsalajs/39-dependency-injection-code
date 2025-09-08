import { Abstract as Locale } from "./Abstract"
// iso - Format: YYYY-MM-DD
export class Iso extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return [String(date[0]).padStart(4, "0"), String(date[1]).padStart(2, "0"), String(date[2]).padStart(2, "0")].join(
			"-"
		)
	}
	override parse(date: string): (number | undefined)[] | undefined {
		return date.split("-").map(p => parseInt(p, 10))
	}
}
Locale.register(new Iso(), "ISO-8601", "da-DK", "fi-FI", "is-IS", "nb-NO", "sv-SE")
