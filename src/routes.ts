import { Router } from 'express';
import generalController from './application/controllers/general.controller';
import personController from './application/controllers/person.controller';
import recommendationController from './application/controllers/recommendation.controller';
import relationshipController from './application/controllers/relationship.controller';
import { CreatePersonDto } from './application/dtos/person/create-person.dto';
import { GetRecommendationDto } from './application/dtos/recommendation/get-recommendation.dto';
import { CreateRelationshipDto } from './application/dtos/relationship/create-relationship.dto';
import { validatePayload } from './infrastructure/middlewares/ValidationMiddleware';

const router = Router();

router.get('/', (_, res) => {
  return res.status(200).json({ message: 'Api is running' });
});

router.post(
  '/person',
  validatePayload(CreatePersonDto, 'body', { whitelist: true }),
  personController.addPerson
);

router.get('/person/:cpf', personController.findPersonByDocument);

router.post(
  '/relationship',
  validatePayload(CreateRelationshipDto, 'body', { whitelist: true }),
  relationshipController.addRelationship
);

router.get(
  '/recommendations/:cpf',
  validatePayload(GetRecommendationDto, 'params', { whitelist: true }),
  recommendationController.getRecommendations
);

router.delete('/clean', generalController.cleanAll);

export { router };
