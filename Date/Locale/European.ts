import { Abstract as Locale } from "./Abstract"
// european - Format: DD/MM/YYYY
export class European extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return [String(date[2]).padStart(2, "0"), String(date[1]).padStart(2, "0"), date[0]].join("/")
	}
	override parse(date: string): (number | undefined)[] | undefined {
		return date
			.split("/")
			.map(p => parseInt(p, 10))
			.reverse()
	}
}
Locale.register(
	new European(),
	"en-GB",
	"en-IE",
	"el-GR",
	"fr-FR",
	"de-DE",
	"es-ES",
	"it-IT",
	"sv-SE",
	"fi-FI",
	"da-DK",
	"pt-PT",
	"pt-BR",
	"bg-BG",
	"mt-MT",
	"ro-RO",
	"hr-HR",
	"sk-SK",
	"sl-SI"
)
