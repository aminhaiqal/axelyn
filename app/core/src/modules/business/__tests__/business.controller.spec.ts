import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from '../business.controller';
import { BusinessService } from '../business.service';
import {
  BadRequestException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('BusinessController', () => {
  let controller: BusinessController;
  let service: BusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        {
          provide: BusinessService,
          useValue: {
            findByPhone: jest.fn(),
            findById: jest.fn(),
            createBusiness: jest.fn(),
            updateBusiness: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
    service = module.get<BusinessService>(BusinessService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    it('should throw if required fields are missing', async () => {
      await expect(controller.register({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw conflict if phone already exists', async () => {
      (service.findByPhone as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(
        controller.register({
          name: 'Biz',
          whatsapp_number: '0123',
          business_type: 'RETAIL',
        } as any),
      ).rejects.toThrow(ConflictException);
    });

    it('should create business successfully', async () => {
      (service.findByPhone as jest.Mock).mockResolvedValue(null);
      (service.createBusiness as jest.Mock).mockResolvedValue({ id: 'abc' });

      const result = await controller.register({
        name: 'Biz',
        whatsapp_number: '0123',
        business_type: 'RETAIL',
      } as any);

      expect(result).toEqual({
        statusCode: 201,
        business_id: 'abc',
        next_step: 'verify_whatsapp',
      });
    });
  });

  describe('checkPhone', () => {
    it('should throw if no whatsapp_number', async () => {
      await expect(controller.checkPhone({} as any)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should return available: false if found', async () => {
      (service.findByPhone as jest.Mock).mockResolvedValue({ id: 1 });
      const result = await controller.checkPhone({
        whatsapp_number: '0123',
      });
      expect(result).toEqual({ available: false });
    });

    it('should return available: true if not found', async () => {
      (service.findByPhone as jest.Mock).mockResolvedValue(null);
      const result = await controller.checkPhone({
        whatsapp_number: '0123',
      });
      expect(result).toEqual({ available: true });
    });
  });
});
