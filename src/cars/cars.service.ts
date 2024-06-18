import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla'
    // },
  ]


  findAll(){
    return this.cars
  }

  findOneById(id: string){
    const car = this.cars.find(car => car.id === id);

    if(!car)
      throw new NotFoundException(`car with ${id} not found`)

    return car
  }

  create(createCarDto: CreateCarDto){
    const newCar: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push(newCar)

    return newCar
  }

  update(id: string, updateCarDto: UpdateCarDto){
    const carDB = this.findOneById(id);

    if(updateCarDto?.id !== id){
      throw new BadRequestException(`the id is not valid inside the body`)
    }

    Object.assign(carDB, updateCarDto)

    return carDB
  }

  delete(id: string): void{
    const carDB = this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id)
  }

  fillCarsWithSeedData(cars: Car[]){
    this.cars = cars;
  }
}
