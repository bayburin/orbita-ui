import { IGroup } from '@modules/user/interfaces/group.interface';

export class IGroupBuilder {
  private group: IGroup;

  constructor() {
    this.group = {
      id: 1,
      name: 'test name',
      description: 'test description'
    };
  }

  build(): IGroup {
    return this.group;
  }

  id(id: number): IGroupBuilder {
    this.group.id = id;

    return this;
  }

  name(name: string): IGroupBuilder {
    this.group.name = name;

    return this;
  }

  description(description: string): IGroupBuilder {
    this.group.description = description;

    return this;
  }
}
