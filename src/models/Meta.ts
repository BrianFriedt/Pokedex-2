export class Meta {
  current_page: number;
  last_page: number;
  path: string;
  from: number;
  to: number;
  per_page: number;
  total: number;

  constructor(current_page: number, last_page: number, path: string, from: number, to: number, per_page: number, total: number) {
    this.current_page = current_page;
    this.from = from;
    this.last_page = last_page;
    this.path = path;
    this.per_page = per_page;
    this.to = to;
    this.total = total;
  }
}
