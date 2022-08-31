interface IResponse<K> {
  statusCode: number;
  data: K;
}

interface IResponseError {
  message: string;
}

export { IResponse, IResponseError };
