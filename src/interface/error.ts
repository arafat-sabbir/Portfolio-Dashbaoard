/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorResponse {
  request?: any;
  response?: { data: { error: string } };
  message?: string;
}
