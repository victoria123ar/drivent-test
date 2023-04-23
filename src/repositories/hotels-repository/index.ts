import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelsById(hotelId: number): Promise<Hotel> {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}

const hotelRepository = {
  findHotels,
  findHotelsById,
};

export default hotelRepository;
