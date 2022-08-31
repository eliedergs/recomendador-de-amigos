import CreateVeiculoNovoDto from '@/dtos/veiculo/CreateVeiculoNovoDto';
import VeiculoNovo from '@/entities/VeiculoNovo';
import { IConcessionaria } from '@/interfaces/Concessionaria/IConcessionaria';
import { IVeiculoNovo } from '@/interfaces/Veiculo/IVeiculoNovo';
import faker from '@faker-js/faker';
import { DateTime } from 'luxon';
import { Connection } from 'typeorm';
import { ConcessionaireMock } from '../concessionaire';
import { generateStringNumber } from '../utils/utils.fixture';

export class NewVehicleMock {
    static generateEntity(data: Partial<IConcessionaria> = {}): VeiculoNovo {
        return new VeiculoNovo({
            id: faker.datatype.uuid(),
            contrato: generateStringNumber(5),
            marca: faker.company.companyName(),
            modelo: faker.lorem.word(),
            createdAt: DateTime.local().toJSDate(),
            updatedAt: DateTime.local().toJSDate(),
            concessionaria: ConcessionaireMock.generateEntity(),
            ...data,
        });
    }

    static generateCreateDto(
        data: Partial<IVeiculoNovo> = {}
    ): CreateVeiculoNovoDto {
        return {
            marca: faker.company.companyName(),
            modelo: faker.lorem.word(),
            valor: Math.random() * 10000,
            concessionaria: ConcessionaireMock.generateCreateDto(),
            contrato: generateStringNumber(5),
            ...data,
        };
    }

    static async insertNewVehicle(connection: Connection, quantity = 1) {
        let _quantity = quantity;
        const newVehicleRepository = connection.getRepository(VeiculoNovo);
        let newVehicleDto: CreateVeiculoNovoDto[] = [];

        do {
            newVehicleDto.push(NewVehicleMock.generateCreateDto());
            --_quantity;
        } while (_quantity != 0);

        return await newVehicleRepository.save(newVehicleDto);
    }
}
