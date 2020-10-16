export enum ClaimPriorities {
  DEFAULT = 'default',
  LOW = 'low',
  HIGH = 'high'
}

export interface IClaimPrioritiesData {
  title: string;
}

export const claimPrioritiesMap: Record<ClaimPriorities, IClaimPrioritiesData> = {
  [ClaimPriorities.DEFAULT]: { title: 'Стандартный' },
  [ClaimPriorities.LOW]: { title: 'Низкий' },
  [ClaimPriorities.HIGH]: { title: 'Высокий' },
};

export function getClaimPriority(priority: ClaimPriorities): IClaimPrioritiesData {
  return claimPrioritiesMap[priority];
}
