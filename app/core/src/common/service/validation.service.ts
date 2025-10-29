import { Injectable } from '@nestjs/common';
import { BusinessType } from '../../modules/business/dto';

@Injectable()
export class ValidationService {
  validateName(name?: string) {
    if (!name || name.trim().length < 3 || name.length > 100) {
      return 'Name must be between 3 and 100 characters.';
    }
    return null;
  }

  validateBusinessType(type?: BusinessType) {
    if (!Object.values(BusinessType).includes(type)) {
      return 'Invalid business type.';
    }
    return null;
  }

  validateLocation(location?: string) {
    if (location && location.length > 500) {
      return 'Location must be less than 500 characters.';
    }
    return null;
  }

  validateOperatingHours(hours?: Record<string, string>) {
    if (!hours) return null;
    const validDays = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    try {
      Object.entries(hours).forEach(([day, time]) => {
        if (!validDays.includes(day.toLowerCase())) throw new Error();
        if (typeof time !== 'string') throw new Error();
      });
      return null;
    } catch {
      return 'Invalid operating hours format.';
    }
  }
}
