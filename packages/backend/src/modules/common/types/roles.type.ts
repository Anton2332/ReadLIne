export enum EAppRoles {
  USER = '',
  ADMIN = 'STUDENT'
}
export interface IJWTPayload {
  id: string;
  role: EAppRoles[];
}
