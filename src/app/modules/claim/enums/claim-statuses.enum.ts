export enum ClaimStatuses {
  OPENED = 'opened',
  AT_WORK = 'at_work',
  CANCELED = 'canceled',
  APPROVED = 'approved',
  REOPENED = 'reopened'
}

export interface IClaimStatusesData {
  title: string;
}

export const claimStatusesMap: Record<ClaimStatuses, IClaimStatusesData> = {
  [ClaimStatuses.OPENED]: { title: 'Открыта' },
  [ClaimStatuses.AT_WORK]: { title: 'В работе' },
  [ClaimStatuses.CANCELED]: { title: 'Отменена' },
  [ClaimStatuses.APPROVED]: { title: 'Согласована' },
  [ClaimStatuses.REOPENED]: { title: 'Открыта повторно' }
};

export function getClaimStatus(status: ClaimStatuses): IClaimStatusesData {
  return claimStatusesMap[status];
}
