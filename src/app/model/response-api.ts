export class ResponseApi<T> {
  Version: string;
  Status: number;
  Message: string;
  Result: T;
}
