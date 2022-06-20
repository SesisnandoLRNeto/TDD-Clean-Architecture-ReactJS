import {
  HttpPostClient,
  HttpPostParams,
} from "@/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusCodeType,
} from "@/data/protocols/http/http-responses";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: unknown;
  result?: HttpResponse = {
    statusCode: HttpStatusCodeType.noContent,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.result);
  }
}
