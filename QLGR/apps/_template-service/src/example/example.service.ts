import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from './example.entity';
import { Repository } from 'typeorm';
import { CreateExampleDto, UpdateExampleDto } from './example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private readonly repo: Repository<Example>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(dto: CreateExampleDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  update(id: string, dto: UpdateExampleDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
