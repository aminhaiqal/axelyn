import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateBusinessDto, UpdateBusinessDto } from './dto';
import { normalizePhoneNumber } from '../../utils/normalize-phone';

export enum BusinessStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPEND = 'SUSPEND',
}

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async findByPhone(whatsapp_number: string) {
    const normalized = normalizePhoneNumber(whatsapp_number);
    return this.prisma.business.findUnique({
      where: { phone_normalized: normalized },
    });
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

  async createBusiness(dto: CreateBusinessDto) {
    const normalized = normalizePhoneNumber(dto.whatsapp_number);
    return this.prisma.business.create({
      data: {
        name: dto.name,
        whatsapp_number: dto.whatsapp_number,
        phone_normalized: normalized,
        business_type: dto.business_type,
        operating_hours: dto.operating_hours ?? {},
        location: dto.location,
        created_by: dto.created_by_id
          ? { connect: { id: dto.created_by_id } }
          : undefined,
        status: BusinessStatus.PENDING_VERIFICATION,
      },
    });
  }

  async updateBusiness(id: string, dto: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: {
        name: dto.name,
        business_type: dto.business_type,
        operating_hours: dto.operating_hours,
        location: dto.location,
        website: dto.website,
        description: dto.description,
      },
    });
  }
}
