import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla'
    },
    {
      id: 2,
      brand: 'Ford',
      model: 'Focus'
    },
    {
      id: 3,
      brande: 'Honda',
      model: 'Civic'
    }
  ]


  findAll(){
    return this.cars
  }

  findOneById(id: number){
    const car = this.cars.find(car => car.id === id);

    if(!car)
      throw new NotFoundException(`car with ${id} not found`)

    return car
  }
}
