import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../../common/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prisma: any;

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    } as any; // ✅ Quick fix for Prisma mock typing

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_pw',
      };

      prisma.user.create.mockResolvedValue(mockUser);

      const result = await userService.createUser({
        email: mockUser.email,
        name: mockUser.name,
        passwordHash: mockUser.passwordHash,
      });

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: mockUser.email,
          name: mockUser.name,
          passwordHash: mockUser.passwordHash,
        },
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: '1', email: 'a@example.com', passwordHash: 'pw1' },
        { id: '2', email: 'b@example.com', passwordHash: 'pw2' },
      ];

      prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
