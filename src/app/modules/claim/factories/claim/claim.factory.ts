import { ClaimInitializer } from './claim.initializer';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { ClaimModel } from '@modules/claim/types/claim.types';

export class ClaimFactory {
  /**
   * Создает объект заявки.
   */
  static create(type: ClaimTypes, attrs: IClaim = { } as IClaim): ClaimModel {
    return ClaimInitializer.for(type).create(attrs);
  }
}
