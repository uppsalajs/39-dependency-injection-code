import { Abstract } from "./Abstract"

export class Iso extends Abstract {
	toString(date: [number, number, number]): string | undefined {
		const [year, month, day] = date
		return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
	}
	parse(date: string): (number | undefined)[] | undefined {
		return date.split("-").map(Number)
	}
}
Abstract.register(new Iso(), "ISO-8601", "sv-SE", "fi-FI")
