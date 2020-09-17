import { User } from './user.model';

describe('User', () => {
  const userI = { id_tn: 32123, tn: 12123, fio: 'Форточкина Клавдия Ивановна' };
  let model: User;

  beforeEach(() => {
    model = new User(userI);
  });

  it('should accept values', () => {
    expect(model.idTn).toEqual(userI.id_tn);
    expect(model.tn).toEqual(userI.tn);
    expect(model.fio).toEqual(userI.fio);
  });
});
