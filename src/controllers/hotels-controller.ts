import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    await hotelsService.confirmed(userId);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send({});
    }
    res.status(httpStatus.PAYMENT_REQUIRED).send({});
  }

  try {
    const hotels = await hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.id);
  const { userId } = req;
  try {
    await hotelsService.confirmed(userId);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send({});
    }
    res.status(httpStatus.PAYMENT_REQUIRED).send({});
  }

  try {
    const hotel = await hotelsService.getHotelById(hotelId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
