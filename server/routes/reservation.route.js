import { Router } from "express";
import { createReservation, getReservationById, getAllReservations, updateReservation, deleteReservation, getClientReservation, confirm, makeReservation, getMyReservation, updateMyReservation, deleteMyReservation } from "../controllers/reservation.controller.js";
import { authorizeClient } from "../middlewares/client.auth.js";
import { authorizeChef, authorizeEmploye, authorizeServer } from "../middlewares/employe.auth.js";

const reservationRouter = Router();

//----------SERVER-----------
reservationRouter.post('/reservations/new', authorizeServer || authorizeChef, createReservation);
reservationRouter.get('/reservations/get/:id', authorizeEmploye, getReservationById);
reservationRouter.get('/reservations/get', authorizeEmploye, getAllReservations);
reservationRouter.put('/reservations/maj/:id', authorizeServer || authorizeChef, updateReservation);
reservationRouter.delete('/reservations/cancel/:id', authorizeChef || authorizeServer, deleteReservation);
reservationRouter.get('/reservations/clients/:id', authorizeEmploye, getClientReservation);
reservationRouter.put('/reservations/confirm/:id', authorizeServer, confirm);

//----------CLIENT--------------
reservationRouter.post('/clients/reservations/new', authorizeClient, makeReservation);
reservationRouter.get('/clients/reservations/get', authorizeClient, getMyReservation);
reservationRouter.put('/clients/reservations/maj/:id', authorizeClient, updateMyReservation);
reservationRouter.delete('/clients/reservation/cancel/:id', authorizeClient, deleteMyReservation);

export default reservationRouter;