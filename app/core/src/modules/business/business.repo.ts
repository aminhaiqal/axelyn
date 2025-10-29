import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateBusinessDto, UpdateBusinessDto } from './dto';

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBusinessDto & { phone_normalized: string }) {
    return this.prisma.business.create({ data });
  }

  async findById(id: string) {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        created_by: { select: { id: true, email: true, full_name: true } },
        members: { select: { id: true, role: true, user_id: true } },
      },
    });
  }

  async findByPhone(phone_normalized: string) {
    return this.prisma.business.findUnique({ where: { phone_normalized } });
  }

  async update(id: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({ where: { id }, data });
  }

  async existsByPhone(phone_normalized: string): Promise<boolean> {
    const count = await this.prisma.business.count({
      where: { phone_normalized },
    });
    return count > 0;
  }
}
