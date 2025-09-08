import { isoly } from "isoly"

export class Date {
	constructor(public year: number, public month: number, public day: number) {}

	toString(locale: isoly.Locale | "ISO-8601" = "ISO-8601"): string {
		let result: string
		switch (locale) {
			case "ISO-8601":
			case "da-DK":
			case "fi-FI":
			case "is-IS":
			case "nb-NO":
			case "sv-SE":
				result = `${this.year}-${String(this.month).padStart(2, "0")}-${String(this.day).padStart(2, "0")}`
				break
			case "en-US":
				result = `${String(this.month).padStart(2, "0")}/${String(this.day).padStart(2, "0")}/${this.year}`
				break
			case "bg-BG":
			case "el-GR":
			case "en-GB":
			case "en-IE":
			case "es-ES":
			case "fr-FR":
			case "hr-HR":
			case "it-IT":
			case "mt-MT":
			case "pt-BR":
			case "pt-PT":
			case "ro-RO":
			case "sk-SK":
			case "sl-SI":
				result = `${String(this.day).padStart(2, "0")}/${String(this.month).padStart(2, "0")}/${this.year}`
				break
			case "cs-CZ":
			case "de-AT":
			case "de-CH":
			case "de-DE":
			case "et-EE":
			case "fr-BE":
			case "fr-CH":
			case "hu-HU":
			case "lt-LT":
			case "lv-LV":
			case "pl-PL":
			case "ru-RU":
				result = `${String(this.day).padStart(2, "0")}.${String(this.month).padStart(2, "0")}.${this.year}`
				break
			case "nl-BE":
			case "nl-NL":
				result = `${String(this.day).padStart(2, "0")}-${String(this.month).padStart(2, "0")}-${this.year}`
				break
			case "ja-JP":
			case "zh-CN":
				result = `${this.year}年${String(this.month).padStart(2, "0")}月${String(this.day).padStart(2, "0")}日`
				break
			case "ko-KR":
				result = `${this.year}년 ${String(this.month).padStart(2, "0")}월 ${String(this.day).padStart(2, "0")}일`
				break
			default:
				throw new Error(`Unsupported locale: ${locale}`)
		}
		return result
	}
}
