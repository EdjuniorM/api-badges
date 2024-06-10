import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/users';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
      private repository: UsersRepository,
      private jwtService: JwtService
    ) {}
  
    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
      const user = await this.repository.findByEmail(email);
      if (!user || !(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
