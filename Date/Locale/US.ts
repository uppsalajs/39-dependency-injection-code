import { Abstract as Locale } from "./Abstract"
// US - Format: MM/DD/YYYY
export class US extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return [String(date[1]).padStart(2, "0"), String(date[2]).padStart(2, "0"), String(date[0])].join("/")
	}
	override parse(date: string): (number | undefined)[] | undefined {
		const parts = date.split("/").map(p => parseInt(p, 10))
		return parts.length == 3 ? [parts[2], parts[0], parts[1]] : undefined
	}
}
Locale.register(new US(), "en-US")
