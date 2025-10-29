import { Injectable, ConflictException } from '@nestjs/common';
import { BusinessRepository } from 'src/modules/business/business.repo';

@Injectable()
export class DuplicateCheckService {
  constructor(private readonly repo: BusinessRepository) {}

  async ensureUniquePhone(phone_normalized: string) {
    const exists = await this.repo.existsByPhone(phone_normalized);
    if (exists) {
      throw new ConflictException({
        errors: { whatsapp_number: 'Phone number already registered' },
      });
    }
  }
}
