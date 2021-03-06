export enum HttpStatusCodeType {
  OK = 200,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export type HttpResponse = {
  statusCode: HttpStatusCodeType;
};
