import { HttpPostClientSpy } from "../../../data/tests/mocks/mock-http-client";
import { RemoteAuthentication } from "../../../domain/usecases/remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should calls HttpClient with correct URL", async () => {
    const url = "url.com";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
