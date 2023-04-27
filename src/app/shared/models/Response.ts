export interface Response{
  data: any;
  message: string;
  hasErrors: boolean;
  errorMessages: Array<string>;
  statusCode: number;
  count: number;
}
