export class Date {
	constructor(readonly year: number, readonly month: number, readonly day: number) {}
	toString() {
		return `${this.year}-${String(this.month).padStart(2, "0")}-${String(this.day).padStart(2, "0")}`
	}
	toJSON() {
		return this.toString()
	}
	static parse(date: string): Date | undefined {
		const [year, month, day] = date.split("-").map(Number)
		return year && month && day ? new Date(year, month, day) : undefined
	}
}
