import { HttpPostClientSpy } from "@/data/tests/mocks/mock-http-client";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { faker } from "@faker-js/faker";
import { mockAuthentication } from "@/domain/tests/mocks/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCodeType } from "@/data/protocols/http/http-responses";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { NotFoundError } from "@/domain/errors/not-found-error";
import { ServerError } from "@/domain/errors/server-error";

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

  test("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.result = {
      statusCode: HttpStatusCodeType.UNAUTHORIZED,
    };

    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.result = {
      statusCode: HttpStatusCodeType.BAD_REQUEST,
    };

    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw NotFoundError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.result = {
      statusCode: HttpStatusCodeType.NOT_FOUND,
    };

    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new NotFoundError());
  });

  test("Should throw ServerError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.result = {
      statusCode: HttpStatusCodeType.SERVER_ERROR,
    };

    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new ServerError());
  });
});
