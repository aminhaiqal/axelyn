import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ConflictException,
  BadRequestException,
  UnprocessableEntityException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import {
  CreateBusinessDto,
  UpdateBusinessDto,
  CheckPhoneDto,
} from './dto/index';

@ApiTags('Business')
@Controller('api/business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  /**
   * POST /api/business/register
   */
  @Post('register')
  async register(@Body() dto: CreateBusinessDto) {
    // Validate required fields
    if (!dto.name || !dto.whatsapp_number || !dto.business_type) {
      throw new BadRequestException({
        errors: {
          name: !dto.name ? 'Business name is required' : undefined,
          whatsapp_number: !dto.whatsapp_number
            ? 'WhatsApp number is required'
            : undefined,
          business_type: !dto.business_type
            ? 'Business type is required'
            : undefined,
        },
      });
    }

    // Check uniqueness
    const exists = await this.businessService.findByPhone(dto.whatsapp_number);
    if (exists) {
      throw new ConflictException({
        errors: { whatsapp_number: 'This phone number is already registered' },
      });
    }

    const business = await this.businessService.createBusiness(dto);

    return {
      statusCode: HttpStatus.CREATED,
      business_id: business.id,
      next_step: 'verify_whatsapp',
    };
  }

  /**
   * GET /api/business/:id
   */
  @Get(':id')
  async getBusiness(@Param('id') id: string) {
    const business = await this.businessService.findById(id);
    if (!business) {
      throw new BadRequestException({
        errors: { id: 'Business not found' },
      });
    }
    return business;
  }

  /**
   * POST /api/business/:id/verify-whatsapp
   */
  @Post(':id/verify-whatsapp')
  @HttpCode(HttpStatus.OK)
  async verifyWhatsapp(@Param('id') id: string) {
    const business = await this.businessService.findById(id);
    if (!business) {
      throw new BadRequestException({
        errors: { id: 'Business not found' },
      });
    }

    // Dummy: initiate verification
    return {
      status: 'pending',
      message: `Verification started for WhatsApp number ${business.whatsapp_number}`,
    };
  }

  /**
   * POST /api/business/check-phone
   */
  @Post('check-phone')
  async checkPhone(@Body() dto: CheckPhoneDto) {
    if (!dto.whatsapp_number) {
      throw new UnprocessableEntityException({
        errors: { whatsapp_number: 'WhatsApp number is required' },
      });
    }

    const exists = await this.businessService.findByPhone(dto.whatsapp_number);
    return { available: !exists };
  }

  /**
   * PUT /api/business/:id
   */
  @Put(':id')
  async updateBusiness(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessDto,
  ) {
    const business = await this.businessService.findById(id);
    if (!business) {
      throw new BadRequestException({
        errors: { id: 'Business not found' },
      });
    }

    const updated = await this.businessService.updateBusiness(id, dto);
    return updated;
  }

  /**
   * Webhook endpoint for WhatsApp integration status
   */
  @Post('/../webhook/integrations/whatsapp')
  @HttpCode(HttpStatus.OK)
  async whatsappWebhook(@Body() body: any) {
    console.log('Received WhatsApp webhook:', body);
    return { received: true };
  }
}
