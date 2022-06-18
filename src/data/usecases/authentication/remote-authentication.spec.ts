import { HttpPostClientSpy } from "../../../data/tests/mocks/mock-http-client";
import { RemoteAuthentication } from "../../../domain/usecases/remote-authentication";
import { faker } from "@faker-js/faker";
import { mockAuthentication } from "../../../domain/tests/mocks/mock-authentication";

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

    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should calls HttpClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
