import { Test, TestingModule } from '@nestjs/testing';
import { BusinessService, BusinessStatus } from '../business.service';
import { PrismaService } from '../../../common/prisma.service';
import { normalizePhoneNumber } from '../../../utils/normalize-phone';

jest.mock('../../../utils/normalize-phone', () => ({
  normalizePhoneNumber: jest.fn(() => '+60123456789'),
}));

describe('BusinessService', () => {
  let service: BusinessService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessService, PrismaService],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByPhone', () => {
    it('should normalize and find business by phone', async () => {
      const fakeBusiness = { id: '1', phone_normalized: '+60123456789' };
      jest
        .spyOn(prisma.business, 'findUnique')
        .mockResolvedValue(fakeBusiness as any);

      const result = await service.findByPhone('0123456789');
      expect(normalizePhoneNumber).toHaveBeenCalledWith('0123456789');
      expect(result).toEqual(fakeBusiness);
    });
  });

  describe('createBusiness', () => {
    it('should create a business with normalized phone', async () => {
      jest
        .spyOn(prisma.business, 'create')
        .mockResolvedValue({ id: '1' } as any);

      const dto = {
        name: 'Test Biz',
        whatsapp_number: '0123456789',
        business_type: 'RETAIL',
      };

      const result = await service.createBusiness(dto as any);

      expect(normalizePhoneNumber).toHaveBeenCalledWith('0123456789');
      expect(prisma.business.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            phone_normalized: '+60123456789',
            status: BusinessStatus.PENDING_VERIFICATION,
          }),
        }),
      );
      expect(result.id).toBe('1');
    });
  });

  describe('updateBusiness', () => {
    it('should update business by id', async () => {
      jest
        .spyOn(prisma.business, 'update')
        .mockResolvedValue({ id: '1', name: 'Updated' } as any);

      const dto = { name: 'Updated' };
      const result = await service.updateBusiness('1', dto);

      expect(prisma.business.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: dto,
      });
      expect(result).toEqual({ id: '1', name: 'Updated' });
    });
  });
});
