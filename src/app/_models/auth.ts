export class LoginRequest {
  email: string = '';
  password: string = '';
}

export class RegisterRequest {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userName: string = '';
  password: string = '';
}

export class AuthResult {
  token: string;
  expirationTime: string;
}

export interface DecodedToken {
  name: string;
  sub: string;
  email: string;
  fullName: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
