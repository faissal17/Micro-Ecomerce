import { Injectable, Inject } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto, LoginAuthDto } from './dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../helpers/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: EmailService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      
      const salt = await bcrypt.genSalt();
      createAuthDto.password = await bcrypt.hash(createAuthDto.password, salt);

      const payload = {
        username: createAuthDto.username,
        email: createAuthDto.email,
      };

      const token = await new JwtService({
        secret: process.env.SECREtKEYJWT,
        signOptions: { expiresIn: '2day' },
      }).sign(payload);
      

      await this.mailerService.sendEmail(token, createAuthDto.email);

      return await this.authRepository.create(createAuthDto);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const users = await this.authRepository.findAll();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return 'vide';
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      return await this.authRepository.update(id, updateAuthDto);
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.authRepository.findOneByEmail(loginAuthDto.email);
      if (!user) {
        return {
          status: false,
          message: 'Invalid email',
        };
      }

      if (user && !user.emailVerify) {
        return {
          status: false,
          message: 'Email not verified check your Inbox',
        };
      }

      const validPassword = await bcrypt.compare(
        loginAuthDto.password,
        user.password,
      );

      if (!validPassword) {
        return {
          status: false,
          message: 'Invalid password',
        };
      }

      const payload = {
        username: user.username,
        email: user.email,
        id: user._id,
      };

      const token = await new JwtService({
        secret: process.env.SECREtKEYJWT,
        signOptions: { expiresIn: '2day' },
      }).sign(payload);

      return {
        status: true,
        message: 'User logged in successfully',
        access_token: token,
        info: payload,
      };
    } catch (error) {
      return error;
    }
  }

  async verifyEmail(email: string, token: string) {
    try {
      const user = await this.authRepository.findOneByEmail(email);
      if (!user) {
        return [
          {
            message: 'Invalid email',
          },
        ];
      }

      const validToken = await new JwtService({
        secret: process.env.SECREtKEYJWT,
        signOptions: { expiresIn: '2day' },
      }).verify(token);

      if (!validToken) {
        return [
          {
            message: 'Invalid token',
          },
        ];
      }

      await this.authRepository.update(user._id, {
        emailVerify: true,
      } as UpdateAuthDto);

      return {
        message: 'Email verified',
      };
    } catch (error) {
      return error;
    }
  }
}
