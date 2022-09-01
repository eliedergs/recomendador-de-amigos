import personService from '@/domain/services/person.service';
import relationshipService from '@/domain/services/relationship.service';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { Request, Response } from 'express';

class GeneralController {
  cleanAll(_: Request, res: Response) {
    personService.cleanAll();
    relationshipService.cleanAll();

    return res.status(HttpStatusCode.OK).send();
  }
}

export default new GeneralController();
