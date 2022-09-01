import PersonService from '@/domain/services/person.service';
import RelationshipService from '@/domain/services/relationship.service';
import { HttpStatusCode } from '@/infrastructure/utils/constants';
import { Request, Response } from 'express';

class RecommendationsController {
  getRecommendations(req: Request, res: Response) {
    const cpf: string = req.params.cpf;

    if (!PersonService.findPersonByDocument(cpf))
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: 'CPF não cadastrado.' });

    const recommendations = RelationshipService.getRecommendations(cpf);

    return res.status(HttpStatusCode.OK).json(recommendations);
  }
}

export default new RecommendationsController();
