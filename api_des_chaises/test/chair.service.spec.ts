import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChairService } from '../src/chair/chair.service';
import { Chair } from '../src/entities';

describe('ChairService', () => {
  let service: ChairService;
  let repository: jest.Mocked<Partial<Repository<Chair>>>;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChairService,
        {
          provide: getRepositoryToken(Chair),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ChairService>(ChairService);
  });

  it('should create a chair', async () => {
    const chair = {
      name: 'Chair A',
      price: 120,
      rating: 4.5,
      image: '/chair-a.png',
      description: 'Une chaise simple',
      category: 'office',
      fullDescription: 'Description complete',
      features: ['solid', 'light'],
      specs: { color: 'black' },
      reviews: 0,
    };

    const savedChair = { id: 1, ...chair };
    repository.save?.mockResolvedValue(savedChair as Chair);

    await expect(service.create(chair)).resolves.toEqual(savedChair);
    expect(repository.save).toHaveBeenCalledWith(chair);
  });

  it('should return all chairs', async () => {
    const chairs = [
      { id: 1, name: 'Chair A' },
      { id: 2, name: 'Chair B' },
    ] as Chair[];

    repository.find?.mockResolvedValue(chairs);

    await expect(service.findAll()).resolves.toEqual(chairs);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should remove a chair and return true when a row is deleted', async () => {
    repository.delete?.mockResolvedValue({ affected: 1 } as any);

    await expect(service.remove(1)).resolves.toBe(true);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});