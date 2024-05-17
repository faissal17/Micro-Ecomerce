import { JwtService } from '@nestjs/jwt';

export class ServiceJwt {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: any) {
    return await this.jwtService.sign(payload, {
      secret: process.env.SECREtKEYJWT,
      expiresIn: '2day',
    });
  }

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }

  async decode(token: string) {
    return await this.jwtService.decode(token);
  }
}
