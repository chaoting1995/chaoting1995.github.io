export class ErrorCreateObjectByColumn extends Error {
  public column: string;
  public columnMessage: string;
  public name: string;

  constructor(objectName: string, objectColumn: string, columnMessage?: string) {
    let message = `Unable to create ${objectName}, column ${objectColumn} incorrect`;

    if (columnMessage && columnMessage !== "") {
      message = `${message}, ${columnMessage}`;
    }

    super(message);

    this.column = objectColumn;
    this.columnMessage = columnMessage ? columnMessage : "";
    this.name = objectName;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ErrorCreateObjectByColumn.prototype);
  }
}

export const IsErrorCreateObjectByColumn = (e: any): e is ErrorCreateObjectByColumn => {
  return e instanceof ErrorCreateObjectByColumn ? true : false;
};
