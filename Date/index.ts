import { isoly } from "isoly"

export class Date {
	constructor(public year: number, public month: number, public day: number) {}

	static parse(date: string, locale: isoly.Locale | "ISO-8601" = "ISO-8601"): Date | undefined {
		let result: (number | undefined)[] | undefined

		switch (locale) {
			case "ISO-8601":
			case "da-DK":
			case "fi-FI":
			case "is-IS":
			case "nb-NO":
			case "sv-SE":
				// Format: YYYY-MM-DD
				result = date.split("-").map(p => parseInt(p, 10))
				break
			case "en-US":
				// Format: MM/DD/YYYY
				const parts = date.split("/").map(p => parseInt(p, 10))
				result = parts.length == 3 ? [parts[2], parts[0], parts[1]] : undefined
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
				// Format: DD/MM/YYYY
				result = date
					.split("/")
					.map(p => parseInt(p, 10))
					.reverse()
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
				// Format: DD.MM.YYYY
				result = date
					.split(".")
					.map(p => parseInt(p, 10))
					.reverse()
				break
			case "nl-BE":
			case "nl-NL":
				// Format: DD-MM-YYYY
				result = date
					.split("-")
					.map(p => parseInt(p, 10))
					.reverse()
				break
			case "ja-JP":
			case "zh-CN":
				// Format: YYYY年MM月DD日
				result = date
					.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
					?.slice(1)
					.map(p => parseInt(p, 10))
				break
			case "ko-KR":
				// Format: YYYY년 MM월 DD일
				result = date
					.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
					?.slice(1)
					.map(p => parseInt(p, 10))
				break
		}

		return result && result.length == 3 && result.every(n => !isNaN(n) && n >= 0)
			? new Date(result[0]!, result[1]!, result[2]!)
			: undefined
	}

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
