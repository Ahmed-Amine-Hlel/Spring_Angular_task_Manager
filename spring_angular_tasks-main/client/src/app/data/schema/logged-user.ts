export interface LoggedUser {
  sub: string;
  roles: Role[];
  exp: number;
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}
