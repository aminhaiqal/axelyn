export enum BusinessType {
  RETAIL = 'RETAIL',
  RESTAURANT = 'RESTAURANT',
  SERVICES = 'SERVICES',
  ECOMMERCE = 'ECOMMERCE',
  EDUCATION = 'EDUCATION',
  HEALTHCARE = 'HEALTHCARE',
  OTHER = 'OTHER',
}

export class CreateBusinessDto {
  name: string;
  whatsapp_number: string;
  business_type: BusinessType;
  operating_hours?: Record<string, string>;
  location?: string;
  created_by_id?: string;
}

export class UpdateBusinessDto {
  name?: string;
  business_type?: BusinessType;
  operating_hours?: Record<string, string>;
  location?: string;
  website?: string;
  description?: string;
}

export class CheckPhoneDto {
  whatsapp_number: string;
}
