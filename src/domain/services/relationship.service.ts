import { CreateRelationshipDto } from '@/application/dtos/relationship/create-relationship.dto';
import { BaseRepository } from '@/infrastructure/repositories/base.repository';
import { countBy, identity, keys } from 'lodash';
import { IPerson } from '../interfaces/person.interface';
import { IRelationship } from '../interfaces/relationship.interface';

class RelationshipService {
  private personRepository: BaseRepository<IPerson>;
  private relationshipRepository: BaseRepository<IRelationship>;

  constructor() {
    this.relationshipRepository = new BaseRepository<IRelationship>(
      'relationship'
    );
    this.personRepository = new BaseRepository<IPerson>('person');
  }

  addRelationship(relationshipDto: CreateRelationshipDto) {
    this.relationshipRepository.add(relationshipDto);
  }

  getRecommendations(document: string) {
    const relationships = this.relationshipRepository.find();
    let { related, unrelated } = this.separateByRelation(
      document,
      relationships
    );

    const relationByOccurrence = countBy(
      related.reduce((list: string[], r) => {
        const { related } = this.separateByRelation(r, unrelated);

        return [...list, ...related];
      }, []),
      identity
    );

    return keys(relationByOccurrence).sort((key1, key2) =>
      relationByOccurrence[key1] < relationByOccurrence[key2] ? 1 : -1
    );
  }

  // Internals

  private separateByRelation(document: string, relationships: IRelationship[]) {
    let related: string[] = [];
    let unrelated: IRelationship[] = [];

    return relationships.reduce(
      (acum, relationship) => {
        let related = '';

        if (relationship.cpf1 === document) related = relationship.cpf2;
        if (relationship.cpf2 === document) related = relationship.cpf1;

        if (related) acum.related.push(related);
        else acum.unrelated.push({ ...relationship });

        return acum;
      },
      { related, unrelated }
    );
  }
}

export default new RelationshipService();
