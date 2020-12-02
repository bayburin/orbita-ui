export enum Genders {
  'MALE' = 'М',
  'FEMALE' = 'Ж'
}

export interface IGendersData {
  image: string;
}

export const gendersMap: Record<Genders, IGendersData> = {
  [Genders.MALE]: { image: 'assets/images/man.png' },
  [Genders.FEMALE]: { image: 'assets/images/woman.png' }
};
