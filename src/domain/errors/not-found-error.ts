export class NotFoundError extends Error {
  constructor() {
    super("Not Found");
    this.name = "Not Found";
  }
}
