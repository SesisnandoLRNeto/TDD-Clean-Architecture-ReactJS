import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCodeType } from "@/data/protocols/http/http-responses";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
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
      case HttpStatusCodeType.unauthorized:
        throw new InvalidCredentialsError();
      default:
        return Promise.resolve();
    }
  }
}
