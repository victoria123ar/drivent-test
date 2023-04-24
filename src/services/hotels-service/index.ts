import { Hotel, TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import { ApplicationError } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotels-repository';

async function confirmed(userId: number): Promise<ApplicationError | boolean> {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status !== TicketStatus.PAID) throw { name: "isn't paid" };

  if (ticket.TicketType.isRemote === true) throw { name: 'ticket type is remote' };

  if (ticket.TicketType.includesHotel === false) throw { name: 'not includes hotel' };

  return null;
}

async function getHotels(): Promise<Hotel[]> {
  const hotels = await hotelRepository.findHotels();

  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelById(hotelId: number): Promise<Hotel> {
  const hotel = await hotelRepository.findHotelsById(hotelId);

  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelsService = {
  confirmed,
  getHotels,
  getHotelById,
};

export default hotelsService;
