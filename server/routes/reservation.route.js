import { Router } from "express";
import { createReservation, getReservationById, getAllReservations, updateReservation, deleteReservation, getClientReservation, confirm, makeReservation, getMyReservation, updateMyReservation, deleteMyReservation } from "../controllers/reservation.controller.js";
import { authorizeClient } from "../middlewares/client.auth.js";

const reservationRouter = Router();

//----------SERVER-----------
reservationRouter.post('/reservations/new', createReservation);
reservationRouter.get('/reservations/get/:id', getReservationById);
reservationRouter.get('/reservations/get', getAllReservations);
reservationRouter.put('/reservations/maj/:id', updateReservation);
reservationRouter.delete('/reservations/cancel/:id', deleteReservation);
reservationRouter.get('/reservations/clients/:id', getClientReservation);
reservationRouter.put('/reservations/confirm/:id', confirm);

//----------CLIENT--------------
reservationRouter.post('/clients/reservations/new', authorizeClient, makeReservation);
reservationRouter.get('/clients/reservations/get', authorizeClient, getMyReservation);
reservationRouter.put('/clients/reservations/maj/:id', authorizeClient, updateMyReservation);
reservationRouter.delete('/clients/reservation/cancel/:id', authorizeClient, deleteMyReservation);

export default reservationRouter;