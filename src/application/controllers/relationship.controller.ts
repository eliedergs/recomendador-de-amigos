import PersonService from '@/domain/services/person.service';
import RelationshipService from '@/domain/services/relationship.service';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { Request, Response } from 'express';
import { CreateRelationshipDto } from '../dtos/relationship/create-relationship.dto';

class RelationshipController {
  addRelationship(req: Request, res: Response) {
    const relationshipDto = req.body as CreateRelationshipDto;
    let message = null;

    if (!PersonService.findPersonByDocument(relationshipDto.cpf1))
      message = `CPF não cadastrado: ${relationshipDto.cpf2}`;

    if (!PersonService.findPersonByDocument(relationshipDto.cpf2))
      message = `CPF não cadastrado: ${relationshipDto.cpf2}`;

    if (message) {
      return res.status(HttpStatusCode.NOT_FOUND).send({ message });
    } else {
      RelationshipService.addRelationship(relationshipDto);

      return res.status(HttpStatusCode.OK).send();
    }
  }
}

export default new RelationshipController();
