import { HttpPostClientSpy } from "../../../data/tests/mocks/mock-http-client";
import { RemoteAuthentication } from "../../../domain/usecases/remote-authentication";
import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};
const makeSut = (url?: string): SutTypes => {
  const urlParams = url || faker.internet.url();
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(urlParams, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  test("Should calls HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
