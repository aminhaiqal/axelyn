import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>; // 👈 ensures correct typing

  const mockUserService: jest.Mocked<UserService> = {
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
  } as any; // 👈 cast to avoid TS complaints about missing methods

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers = [
        {
        id: '1',
        email: 'a@mail.com',
        name: 'Alice',
        passwordHash: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
        },
    ];

    service.getAllUsers.mockResolvedValue(mockUsers);

    const result = await controller.getAll();

    expect(service.getAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });

  it('should create a user', async () => {
    const body = { email: 'b@mail.com', passwordHash: 'hashed', name: 'Bob' };
    const mockUser = {
        id: '2',
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    service.createUser.mockResolvedValue(mockUser);

    const result = await controller.create(body);

    expect(service.createUser).toHaveBeenCalledWith(body);
    expect(result).toEqual(mockUser);
  });
});
