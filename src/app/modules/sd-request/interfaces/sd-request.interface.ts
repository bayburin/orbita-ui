import { IClaim } from '@modules/claim/interfaces/claim.interface';

export interface ISdRequest extends IClaim {
  service_id: number;
  app_template_id: number;
  service_name: string;
  app_template_name: string;
  rating: number;
}
