import CreateConcessionariaDto from '@/dtos/concessionaria/CreateConcessionariaDto';
import Concessionaria from '@/entities/Concessionaria';
import { IConcessionaria } from '@/interfaces/Concessionaria/IConcessionaria';
import ConcessionariaRepository from '@/repositories/ConcessionariaRepository';
import faker from '@faker-js/faker';
import { DateTime } from 'luxon';
import { Connection } from 'typeorm';
import { generateStringNumber } from '../utils/utils.fixture';

export class ConcessionaireMock {
    static generateEntity(data: Partial<IConcessionaria> = {}): Concessionaria {
        return new Concessionaria({
            id: faker.datatype.uuid(),
            razaoSocial: faker.company.companyName(),
            cnpj: generateStringNumber(14),
            endereco: faker.address.streetAddress(),
            numero: +generateStringNumber(3),
            complemento: faker.address.streetAddress(),
            bairro: faker.lorem.word(),
            cidade: faker.address.city(),
            cep: generateStringNumber(8),
            email: faker.internet.email(),
            telefone: generateStringNumber(11),
            createdAt: DateTime.local().toJSDate(),
            updatedAt: DateTime.local().toJSDate(),
            ...data,
        });
    }

    static generateCreateDto(
        data: Partial<IConcessionaria> = {}
    ): CreateConcessionariaDto {
        return {
            razaoSocial: faker.company.companyName(),
            cnpj: generateStringNumber(14),
            endereco: faker.address.streetAddress(),
            numero: +generateStringNumber(3),
            complemento: faker.address.streetAddress(),
            bairro: faker.lorem.word(),
            cidade: faker.address.city(),
            cep: generateStringNumber(8),
            email: faker.internet.email(),
            telefone: generateStringNumber(11),
            ...data,
        };
    }

    static async insertConcessionaires(connection: Connection, quantity = 1) {
        let _quantity = quantity;
        const concessionaireRepository = connection.getCustomRepository(
            ConcessionariaRepository
        );
        let concessionairesDto: CreateConcessionariaDto[] = [];

        do {
            concessionairesDto.push(ConcessionaireMock.generateCreateDto());
            --_quantity;
        } while (_quantity != 0);

        return await concessionaireRepository.save(concessionairesDto);
    }
}
