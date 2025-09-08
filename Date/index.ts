export class Date {
	constructor(public year: number, public month: number, public day: number) {}

	toString(): string {
		return `${this.year}-${String(this.month).padStart(2, "0")}-${String(this.day).padStart(2, "0")}`
	}
}
