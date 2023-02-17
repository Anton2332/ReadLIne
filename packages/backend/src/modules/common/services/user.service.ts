import { Injectable } from '@nestjs/common';
import { user, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<user | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<user[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createUser(data: Prisma.userCreateInput): Promise<user> {
    return this.prisma.user.create({
      data
    });
  }

  async updateUser(params: { where: Prisma.userWhereUniqueInput; data: Prisma.userUpdateInput }): Promise<user> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where
    });
  }

  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<user> {
    return this.prisma.user.delete({
      where
    });
  }
}
