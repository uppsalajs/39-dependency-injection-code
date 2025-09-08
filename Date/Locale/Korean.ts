import { Abstract as Locale } from "./Abstract"
// korean - Format: YYYY년 MM월 DD일
export class Korean extends Locale {
	override format(date: [number, number, number]): string | undefined {
		return `${date[0]}년 ${String(date[1]).padStart(2, "0")}월 ${String(date[2]).padStart(2, "0")}일`
	}
	override parse(date: string): (number | undefined)[] | undefined {
		return date
			.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
			?.slice(1)
			.map(p => parseInt(p, 10))
	}
}
Locale.register(new Korean(), "ko-KR")
