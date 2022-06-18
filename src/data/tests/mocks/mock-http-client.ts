import { HttpPostClient } from "../../protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(urlParam: string): Promise<void> {
    this.url = urlParam;
    return Promise.resolve();
  }
}
