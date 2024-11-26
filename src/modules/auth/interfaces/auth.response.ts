export interface AuthResponseLogin {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  access_token: string;
  token_type: string;
  expires_in: number;
}
