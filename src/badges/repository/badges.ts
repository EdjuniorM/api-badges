import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBadgeDto } from "../dtos/create-badge.dto";

@Injectable()
export class BadgesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async paginate(page: number, size: number, sort: string, order: string, search: string) {
        const skip = Math.max(0, (page - 1) * size);
        const take = size;
        const orderBy = { [sort]: order };
        const where = search
            ? {
                name: {
                    contains: search,
                },
            }
            : {};
        const result = await this.prisma.badge.findMany({
            skip,
            take,
            orderBy,
            where,
        });

        const totalItems = await this.prisma.badge.count({
            where: { name: {contains: search, mode: 'insensitive'}}
        });
        return { result, totalItems };
    }

    async create(createBadgeDto: CreateBadgeDto) {
        return this.prisma.badge.create({ data: createBadgeDto });
    }
}
