import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chair } from '../entities';

@Injectable()
export class ChairService {
  constructor(
    @InjectRepository(Chair)
    private chairRepository: Repository<Chair>,
  ) {}

  create(chair: Omit<Chair, 'id'>): Promise<Chair> {
    return this.chairRepository.save(chair);
  }

  findAll(): Promise<Chair[]> {
    return this.chairRepository.find();
  }

  findOne(id: number): Promise<Chair | null> {
    return this.chairRepository.findOneBy({ id });
  }

  update(id: number, chair: Partial<Chair>): Promise<Chair | null> {
    this.chairRepository.update(id, chair);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.chairRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
