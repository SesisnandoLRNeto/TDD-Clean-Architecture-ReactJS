import { HttpResponse } from "./http-responses";

export type HttpPostParams = {
  url: string;
  body?: unknown;
  result?: unknown;
};
export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>;
}
