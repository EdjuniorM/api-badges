import { Injectable } from '@nestjs/common';
import { BadgesRepository } from './repository/badges';
import { CreateBadgeDto } from './dtos/create-badge.dto';

@Injectable()
export class BadgesService {
    constructor(private readonly repository: BadgesRepository) {}

    async paginate(page: number, size: number, sort: string, order: string, search: string) {
        const {result, totalItems} = await this.repository.paginate(page, size, sort, order, search);

        const totalPages = Math.ceil(totalItems / size) - 1;
        const currentPage = Number(page);

        return {
            result,
            pagination: {
                length: totalItems,
                size: size,
                lastPage: totalPages,
                page: currentPage,
                startIndex: currentPage * size,
                endIndex: currentPage * size + (size - 1),
            } ,
        };
    }

    async create(createBadgeDto: CreateBadgeDto) {
        return this.repository.create(createBadgeDto);
    }
}
