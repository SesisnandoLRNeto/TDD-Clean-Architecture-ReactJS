import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCodeType } from "@/data/protocols/http/http-responses";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { NotFoundError } from "@/domain/errors/not-found-error";
import { ServerError } from "@/domain/errors/server-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AuthParams } from "@/domain/usecases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeType.OK:
        break;
      case HttpStatusCodeType.UNAUTHORIZED:
        throw new InvalidCredentialsError();
      case HttpStatusCodeType.NOT_FOUND:
        throw new NotFoundError();
      case HttpStatusCodeType.SERVER_ERROR:
        throw new ServerError();
      default:
        throw new UnexpectedError();
    }
  }
}
