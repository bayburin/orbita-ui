import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ISvtTypeBuilder } from './i-svt-type.builder';

export class ISvtItemBuilder extends ModelBuilder<ISvtItem> {
  constructor() {
    super();

    this.model = {
      item_id: null,
      type_id: null,
      workplace_id: null,
      model_id: null,
      item_model: '',
      invent_num: '',
      serial_num: '',
      status: '',
      short_item_model: '',
      type: new ISvtTypeBuilder().build()
    }
  }

  testBuild(): ISvtItem {
    this.model.item_id = this.model.item_id || faker.random.number();
    this.model.type_id = this.model.type_id || faker.random.number();
    this.model.workplace_id = this.model.workplace_id || faker.random.number();
    this.model.model_id = this.model.model_id || faker.random.number();
    this.model.item_model = this.model.item_model || faker.random.word();
    this.model.invent_num = this.model.invent_num || faker.random.word();
    this.model.serial_num = this.model.serial_num || faker.random.word();
    this.model.status = this.model.status || faker.random.word();
    this.model.short_item_model = this.model.short_item_model || faker.random.word();
    this.model.type = this.model.type.type_id ? this.model.type : new ISvtTypeBuilder().testBuild();

    return this.model;
  }

  short_item_model(short_item_model: string): ISvtItemBuilder {
    this.model.short_item_model = short_item_model;

    return this;
  }
}