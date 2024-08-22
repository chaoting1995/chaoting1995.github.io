type EnumKeys = Array<string> | Array<number>;

export class ErrorCreateObjectByColumnEnum extends Error {
  public column: string;
  public columnValue: unknown;
  public enumKeys: EnumKeys;
  public name: string;

  constructor(objectName: string, objectColumn: string, objectColumnValue: unknown, objectColumnEnumKeys: EnumKeys) {
    super(
      `Unable to create ${objectName}, column ${objectColumn} "${objectColumnValue}" not allow, must include [${objectColumnEnumKeys.join(", ")}]`,
    );

    this.column = objectColumn;
    this.columnValue = objectColumnValue;
    this.enumKeys = objectColumnEnumKeys;
    this.name = objectName;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ErrorCreateObjectByColumnEnum.prototype);
  }
}

export const IsErrorCreateObjectByColumnEnum = (e: unknown): e is ErrorCreateObjectByColumnEnum => {
  return e instanceof ErrorCreateObjectByColumnEnum ? true : false;
};
