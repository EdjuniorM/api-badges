import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dtos/create-user-dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
          where: { email },
        });
      }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({ 
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
                password: hashedPassword,
              }, 
        });
    }
}
