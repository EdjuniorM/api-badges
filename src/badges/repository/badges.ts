import { Injectable } from "@nestjs/common";
import { Badge } from "../entity/Badge";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BadgesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async paginate(
        page: number,
        size: number,
        sort: string,
        order: string,
        search: string
      ): Promise<{ result: Badge[]; totalItems: number }> {
        const skip = Math.max(0, (page - 1) * size); 
        const take = size; 
        const orderBy = { [sort]: order }; 
        const where = search
          ? {
              name: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode, 
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
          where,
        });
    
        return { result, totalItems };
      }

    async create(createBadge: Badge): Promise<Badge | null> {
        return this.prisma.badge.create({ data: createBadge });
    }

    async update(id: number, updateBadge: Badge) {
      return this.prisma.badge.update({
        where: { id },
        data: updateBadge,
      });
    }
  
    async findById(id: number) {
      return this.prisma.badge.findUnique({ where: { id } });
    }

    async findBySlug(slug: string): Promise<Badge | null> {
        return this.prisma.badge.findFirst({ where: { slug } });
    }

    // async delete(id: number) {
    //   return this.prisma.badge.delete({ where: { id } });
    // }
}
