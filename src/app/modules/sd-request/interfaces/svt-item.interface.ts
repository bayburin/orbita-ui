import { ISvtType } from './svt-type.interface';

export interface ISvtItem {
  item_id: number;
  type_id: number;
  workplace_id: number;
  model_id: number;
  item_model: string;
  invent_num: string;
  serial_num: string;
  status: string;
  short_item_model: string;
  type: ISvtType;
}
