import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dtos/create-user-dto";
import * as bcrypt from 'bcrypt';
import { User } from "../entity/User";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUser: User) {
        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        return this.prisma.user.create({ 
            data: {
                email: createUser.email,
                name: createUser.name,
                password: hashedPassword,
              }, 
        });
    }

    async findByEmail(email: string) {
      return this.prisma.user.findUnique({
        where: { email },
      });
    }

    async findById(id: number) {
      return this.prisma.user.findUnique({
        where: { id },
      });
    }
}
