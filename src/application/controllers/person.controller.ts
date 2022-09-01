import PersonService from '@/domain/services/person.service';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { Request, Response } from 'express';
import { CreatePersonDto } from '../dtos/person/create-person.dto';

class PersonController {
  addPerson(req: Request, res: Response) {
    const person = req.body as CreatePersonDto;
    const hasPerson = PersonService.findPersonByDocument(person.cpf);

    if (!!hasPerson) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({
        message: 'Este CPF já está cadastrado',
      });
    }

    PersonService.addPerson(person);

    return res.status(HttpStatusCode.OK).send();
  }

  findPersonByDocument(req: Request, res: Response) {
    const cpf = req.params.cpf || '';

    const person = PersonService.findPersonByDocument(cpf);

    return person
      ? res.status(HttpStatusCode.OK).json(person)
      : res.status(HttpStatusCode.NOT_FOUND).send({
          message: 'CPF não encontrado.',
        });
  }
}

export default new PersonController();
