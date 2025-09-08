import { Abstract as Locale } from "./Abstract"
// german - Format: DD.MM.YYYY
export class German extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return [String(date[2]).padStart(2, "0"), String(date[1]).padStart(2, "0"), date[0]].join(".")
	}
	override parse(date: string): (number | undefined)[] | undefined {
		return date
			.split(".")
			.map(p => parseInt(p, 10))
			.reverse()
	}
}
Locale.register(
	new German(),
	"cs-CZ",
	"de-AT",
	"de-CH",
	"de-DE",
	"et-EE",
	"fr-BE",
	"fr-CH",
	"hu-HU",
	"lt-LT",
	"lv-LV",
	"pl-PL",
	"ru-RU"
)
