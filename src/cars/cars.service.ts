import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    /*     {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    }, */
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`El carro de id: ${id} no existe`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`El id del carro no puede ser modificado`);
    }

    const updatedCar = { ...carDB };

    if (updateCarDto.brand !== undefined) {
      updatedCar.brand = updateCarDto.brand;
    }

    if (updateCarDto.model !== undefined) {
      updatedCar.model = updateCarDto.model;
    }

    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));

    return updatedCar;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return 'El carro fue eliminado correctamente';
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
