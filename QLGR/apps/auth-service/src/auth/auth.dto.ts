export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export class RefreshDto {
  refreshToken: string;
}
