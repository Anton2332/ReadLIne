export interface IUser {
  discordId: string;
  discriminator: string;
  avatar: string;
  username: string;
}

export interface AuthServiceProvider {
  validateUser(details: IUser): Promise<IUser>;
  createUser(details: IUser): Promise<IUser>;
  findUser(discordId: string): Promise<IUser | undefined>;
}

export type Done = (err: Error, user: IUser) => void;
