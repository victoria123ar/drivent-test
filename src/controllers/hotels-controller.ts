import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    await hotelsService.confirmed(userId);
  } catch (error) {
    console.log(error);
  }

  try {
    const hotels = await hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    console.log(error);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.id);
  const { userId } = req;
  try {
    await hotelsService.confirmed(userId);
  } catch (error) {
    console.log(error);
  }

  try {
    const hotel = await hotelsService.getHotelById(hotelId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    console.log(error);
  }
}
