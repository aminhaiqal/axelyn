import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  async initiateConnection(businessId: string, phone: string) {
    this.logger.log(`Starting WhatsApp verification for 
    ${businessId} ${phone}`);
    // Simulate sending OTP or webhook trigger
    return {
      status: 'pending',
      next_step: 'await_verification',
    };
  }

  async webhookHandler(payload: any) {
    this.logger.debug(`Received webhook: ${JSON.stringify(payload)}`);
    // TODO: update whatsapp_verified=true in DB
  }
}
