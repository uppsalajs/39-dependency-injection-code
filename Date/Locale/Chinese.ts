import { Abstract as Locale } from "./Abstract"
// chinese - Format: YYYY年MM月DD日
export class Chinese extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return `${date[0]}年${String(date[1]).padStart(2, "0")}月${String(date[2]).padStart(2, "0")}日`
	}
	override parse(date: string): (number | undefined)[] | undefined {
		return date
			.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
			?.slice(1)
			.map(p => parseInt(p, 10))
	}
}
Locale.register(new Chinese(), "zh-CN", "zh-TW", "zh-HK", "ja-JP")
