import { Prisma, User } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findById(userId: number): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  findById,
};

export default userRepository;
