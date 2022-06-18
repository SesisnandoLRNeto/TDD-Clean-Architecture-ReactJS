import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "@/domain/usecases/remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should calls HttpClient with correct URL", async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(urlParam: string): Promise<void> {
        this.url = urlParam;
        return Promise.resolve();
      }
    }

    const url = "url.com";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
