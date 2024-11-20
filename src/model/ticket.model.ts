
export default class Ticket {
  constructor (
    private readonly _number: number,
    private _desk: number | null
  ) { }

  get desk (): number | null {
    return this._desk
  }

  set desk (desk: number) {
    this._desk = Number(desk)
  }

  get toJSON (): any {
    return {
      number: this._number,
      desktop: this._desk
    }
  }
}
