export class ErrorCreateObjectByEmpty extends Error {
  public name: string;

  constructor(objectName: string) {
    super(`Unable to create ${objectName}, input empty`);
    this.name = objectName;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ErrorCreateObjectByEmpty.prototype);
  }
}

export const IsErrorCreateObjectByEmpty = (e: any): e is ErrorCreateObjectByEmpty => {
  return e instanceof ErrorCreateObjectByEmpty ? true : false;
};
