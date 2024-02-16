export interface Response<T = any> {
  error: boolean;
  data: T,
  msg: string;
  code: number;
  type: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
}


